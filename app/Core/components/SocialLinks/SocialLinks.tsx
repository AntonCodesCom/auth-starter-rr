import { Box, Link, Stack } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function CoreSocialLinks() {
  return (
    <Stack display="inline-flex" direction="row" gap={2} color="text.secondary">
      <Link
        variant="body2"
        href="https://github.com/AntonCodesCom"
        color="inherit"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <GitHub fontSize="small" sx={{ mr: 0.5, mb: 0.5 }} />
        <span>GitHub</span>
      </Link>
      <Link
        variant="body2"
        href="https://linkedin.com/in/antoncodes"
        color="inherit"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <LinkedIn fontSize="small" sx={{ mr: 0.5, mb: 0.5 }} />
        <span>LinkedIn</span>
      </Link>
    </Stack>
  );
}
