import { KeyboardEvent } from 'react';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Competency } from '../data/competencies';

type RadarPentagonProps = {
  competencies: Competency[];
  selectedCompetencyId?: string;
  onSelectCompetency: (competencyId: string) => void;
};

type Point = {
  x: number;
  y: number;
};

const size = 360;
const center = size / 2;
const maxRadius = 108;
const labelRadius = 148;

function getPoint(index: number, total: number, radius: number): Point {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;

  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
}

function toPointsAttribute(points: Point[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function getTextAnchor(x: number): 'start' | 'middle' | 'end' {
  if (x < center - 12) {
    return 'end';
  }

  if (x > center + 12) {
    return 'start';
  }

  return 'middle';
}

export function RadarPentagon({
  competencies,
  selectedCompetencyId,
  onSelectCompetency,
}: RadarPentagonProps) {
  const theme = useTheme();
  const total = competencies.length;
  const outerPoints = competencies.map((_, index) => getPoint(index, total, maxRadius));
  const valuePoints = competencies.map((competency, index) =>
    getPoint(index, total, (competency.percentage / 100) * maxRadius),
  );

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, competencyId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectCompetency(competencyId);
    }
  };

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Radarvisualisatie van competenties"
      sx={{
        display: 'block',
        width: '100%',
        maxWidth: 460,
        mx: 'auto',
      }}
    >
      {[0.33, 0.66].map((scale) => (
        <polygon
          key={scale}
          points={toPointsAttribute(
            competencies.map((_, index) => getPoint(index, total, maxRadius * scale)),
          )}
          fill="none"
          stroke={theme.palette.divider}
          strokeWidth="1"
        />
      ))}

      <polygon
        points={toPointsAttribute(outerPoints)}
        fill="none"
        stroke={theme.palette.grey[500]}
        strokeWidth="1.5"
      />

      {outerPoints.map((point, index) => (
        <line
          key={competencies[index].id}
          x1={center}
          y1={center}
          x2={point.x}
          y2={point.y}
          stroke={theme.palette.divider}
          strokeWidth="1"
        />
      ))}

      <polygon
        points={toPointsAttribute(valuePoints)}
        fill={alpha(theme.palette.grey[700], 0.16)}
        stroke={theme.palette.grey[700]}
        strokeWidth="2"
      />

      {valuePoints.map((point, index) => (
        <circle
          key={competencies[index].id}
          cx={point.x}
          cy={point.y}
          r="4"
          fill={theme.palette.grey[700]}
        />
      ))}

      {competencies.map((competency, index) => {
        const labelPoint = getPoint(index, total, labelRadius);
        const isSelected = competency.id === selectedCompetencyId;

        return (
          <g
            key={competency.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCompetency(competency.id)}
            onKeyDown={(event) => handleKeyDown(event, competency.id)}
            aria-label={`${competency.label}, ${competency.percentage}%`}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <circle
              cx={labelPoint.x}
              cy={labelPoint.y - 4}
              r={isSelected ? 22 : 18}
              fill={isSelected ? alpha(theme.palette.grey[700], 0.1) : 'transparent'}
            />
            <text
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={getTextAnchor(labelPoint.x)}
              fontFamily={theme.typography.fontFamily}
              fontSize="12"
              fontWeight={isSelected ? 700 : 500}
              fill={isSelected ? theme.palette.text.primary : theme.palette.text.secondary}
            >
              {competency.label}
            </text>
            <text
              x={labelPoint.x}
              y={labelPoint.y + 16}
              textAnchor={getTextAnchor(labelPoint.x)}
              fontFamily={theme.typography.fontFamily}
              fontSize="11"
              fill={theme.palette.text.disabled}
            >
              {competency.percentage}%
            </text>
          </g>
        );
      })}
    </Box>
  );
}
