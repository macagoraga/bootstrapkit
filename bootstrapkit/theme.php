<?php

/**
 * Theme configuration file.
 *
 * @link http://pagekit.com/docs/themes - basic explanation of theme development
 * @link http://pagekit.com/docs/configuration - full documentation of config options
 */
return [

    /**
     * Namespace to autoload theme classes.
     */
    'autoload' => [

        'Macagoraga\\Bootstrapkit\\' => 'src'

    ],

    /**
     * The main theme class to be loaded when the theme is booted.
     */
    'main' => 'Macagoraga\\Bootstrapkit\\BootstrapkitTheme',

    /**
     * Define default settings values and views where end users can change these values.
     */
    /*'parameters' => [

        'settings' => [
            'view' => 'theme://alpha/views/admin/settings.razr'
        ],

        'widgets'  => [
            'view' => 'theme://alpha/views/admin/widgets/edit.razr'
        ]

    ],*/

    /**
     * Widget positions offered by this theme. These positions will be rendered in different locations of the theme's template.
     */
    'positions' => [

        'logo'       => 'Logo',
        'logo-small' => 'Logo Small',
        'navbar'     => 'Navbar',
        'top'        => 'Top',
        'sidebar-a'  => 'Sidebar A',
        'sidebar-b'  => 'Sidebar B',
        'footer'     => 'Footer',
        'offcanvas'  => 'Offcanvas'

    ],

    /**
     * List of renderers provided by this theme. A renderer determines the markup to be used in a widget position.
     */
    'renderer' => [

      'blank'     => 'theme://bootstrapkit/views/renderer/position.blank.razr',
      'grid'      => 'theme://bootstrapkit/views/renderer/position.grid.php',
      'navbar'    => 'theme://bootstrapkit/views/renderer/position.navbar.razr',
      'nav'       => 'theme://bootstrapkit/views/renderer/position.nav.razr',
      'offcanvas' => 'theme://bootstrapkit/views/renderer/position.offcanvas.razr',
      'panel'     => 'theme://bootstrapkit/views/renderer/position.panel.razr'
    ],

    /**
     * Overwrite default template files with templates provided by the theme and define stream wrappers for shorter path access.
     */
    'resources' => [
        'override' => [
          'extension://system/views' => 'views/system',
          'extension://blog/views' => 'views/blog',
          'extension://page/views' => 'views/page',
          'extension://miiqa/views' => 'views/miiqa',
          'extension://sgallerie/views' => 'views/sgallerie',
          'extension://wall/views' => 'views/wall'
        ]
    ],

];
