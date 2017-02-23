import { ajax } from 'src/ajax';
import adapter from 'AnalyticsAdapter';

/**
 * PubWise.io Analytics
 * Contact: support@pubwise.io
 * Developer: Stephen Johnston
 */

const utils = require('../../utils');
var url = '//api.pubwise.io/api/v1/event/add/';
var site_guid = 'unknown';
const analyticsType = 'endpoint';

export default utils.extend(adapter(
  {
    url,
    analyticsType
  }
  ),
  {
    // Override AnalyticsAdapter functions by supplying custom methods
    track({ eventType, args }) {
        //var final_url = url;
        if (args.config !== undefined) {
            var config_data = args.config;

            if (config_data.endpoint !== undefined && config_data.endpoint !== '') {
                url = config_data.endpoint;
            }
            if (config_data.site !== undefined && config_data.site !== '') {
                site_guid = config_data.site;
            }
        }
        args.guid = site_guid;
        ajax(url, (result) => utils.logInfo('Analytics PubWise V1 Endpoint',result), JSON.stringify({ eventType, args }));
    }
  });
