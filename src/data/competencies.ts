export type Competency = {
  id: string;
  label: string;
  percentage: number;
  description?: string;
};

export const competencies: Competency[] = [
  {
    id: 'analyseren',
    label: 'Analyseren',
    percentage: 68,
    description: 'Informatie onderzoeken en verbanden leggen.',
  },
  {
    id: 'adviseren',
    label: 'Adviseren',
    percentage: 55,
    description: 'Onderbouwde aanbevelingen geven.',
  },
  {
    id: 'ontwerpen',
    label: 'Ontwerpen',
    percentage: 72,
    description: 'Oplossingen vormgeven op basis van eisen.',
  },
  {
    id: 'realiseren',
    label: 'Realiseren',
    percentage: 48,
    description: 'Oplossingen bouwen en opleveren.',
  },
  {
    id: 'manage-control',
    label: 'Manage & Control',
    percentage: 60,
    description: 'Voortgang bewaken en bijsturen.',
  },
];
