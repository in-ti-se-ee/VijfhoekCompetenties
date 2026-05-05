import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { competencies } from './data/competencies';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb', py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <Typography component="h1" variant="h4" fontWeight={700} gutterBottom>
              Competentieoverzicht via vijfhoek
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Bekijk je ontwikkeling per competentie. De weergave is een indicatie op basis van
              onderbouwing.
            </Typography>
          </Box>

          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={7}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                    Vijfhoek visualisatie
                  </Typography>
                  <Box
                    sx={{
                      minHeight: 360,
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'background.default',
                      color: 'text.secondary',
                      textAlign: 'center',
                      px: 3,
                    }}
                  >
                    <Typography>Placeholder voor de vijfhoek/radar visualisatie</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                    Indicatie per competentie
                  </Typography>
                  <Stack spacing={2}>
                    {competencies.map((competency) => (
                      <Box key={competency.id}>
                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                          <Typography variant="body2" color="text.secondary">
                            {competency.label}
                          </Typography>
                          <Typography variant="body2" fontWeight={700}>
                            {competency.percentage}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={competency.percentage}
                          sx={{ mt: 1, height: 10, borderRadius: 999 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                    Informatie
                  </Typography>
                  <Typography color="text.secondary">
                    Deze visualisatie is een hulpmiddel en geen beoordeling.
                  </Typography>
                  <Typography color="text.secondary">
                    Klik op een competentie voor meer detailinformatie.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                    Toelichting
                  </Typography>
                  <Stack spacing={1}>
                    <Typography color="text.secondary">Placeholder tekstregel voor toelichting.</Typography>
                    <Typography color="text.secondary">Placeholder tekstregel voor extra context.</Typography>
                    <Typography color="text.secondary">Placeholder tekstregel voor vervolgstappen.</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
