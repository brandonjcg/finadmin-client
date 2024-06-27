import { Card, CardContent, Typography } from '@mui/material';

interface TotalCardProps {
  total: string | null;
}

export const TotalCard = ({ total }: TotalCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="center" aria-label="Total">
          Total
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {total && `${total}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
