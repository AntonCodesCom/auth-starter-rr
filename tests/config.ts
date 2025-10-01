import appConfig from '~/config';

// app config
const { defaultRestrictedRoutePathname } = appConfig;

/**
 * E2E config
 */
const e2eConfig = {
  defaultRestrictedRoutePathname,
  defaultRestrictedRouteLabel: 'Restricted Route',
};

export default e2eConfig;
