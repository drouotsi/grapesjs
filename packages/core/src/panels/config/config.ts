import { PanelProperties } from '../model/Panel';

const swv = 'sw-visibility';
const expt = 'export-template';
const osm = 'open-sm';
const otm = 'open-tm';
const ola = 'open-layers';
const obl = 'open-blocks';
const ful = 'fullscreen';
const prv = 'preview';
const openPages = 'open-pages';

interface ButtonProps {
  id?: string;
  active?: boolean;
  label?: string;
  togglable?: boolean;
  className?: string;
  command?: string | (() => any);
  context?: string;
  attributes?: Record<string, any>;
}

interface PanelProps extends Omit<PanelProperties, 'id' | 'buttons'> {
  id?: string;
  buttons?: ButtonProps[];
}

export interface PanelsConfig {
  stylePrefix?: string;

  /**
   * Default panels.
   */
  defaults?: PanelProps[];
}

const config: () => PanelsConfig = () => ({
  stylePrefix: 'pn-',
  defaults: [
    {
      id: 'commands',
      buttons: [{}],
    },
    {
      id: 'options',
      buttons: [
        {
          active: true,
          id: swv,
          className: 'fa fa-square-o',
          command: 'core:component-outline',
          context: swv,
          attributes: { title: 'View components' },
        },
        {
          id: prv,
          className: 'fa fa-eye',
          command: prv,
          context: prv,
          attributes: { title: 'Preview' },
        },
        {
          id: ful,
          className: 'fa fa-arrows-alt',
          command: ful,
          context: ful,
          attributes: { title: 'Fullscreen' },
        },
        {
          id: expt,
          className: 'fa fa-code',
          command: expt,
          attributes: { title: 'View code' },
        },
      ],
    },
    {
      id: 'views',
      buttons: [
        {
          id: openPages,
          command: openPages,
          active: true,
          togglable: false,
          label: 'Pages',
          attributes: { title: 'Open pages' },
        },
        {
          id: obl,
          command: obl,
          togglable: false,
          label: 'Edition',
          attributes: { title: 'Open edition' },
        },
        {
          id: otm,
          className: 'fa fa-cog',
          command: otm,
          togglable: false,
          attributes: { title: 'Settings' },
        },
        {
          id: osm,
          className: 'fa fa-paint-brush',
          command: osm,
          togglable: false,
          attributes: { title: 'Open Style Manager' },
        },
      ],
    },
  ],
});

export default config;
