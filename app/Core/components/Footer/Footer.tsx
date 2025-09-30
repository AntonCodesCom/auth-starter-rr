import { Typography } from '@mui/material';
import CoreSocialLinks from '../SocialLinks';

export default function CoreFooter() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" mb={1}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {' Anton Bahurinsky'}
      </Typography>
      <CoreSocialLinks />
    </>
  );
}
