<?php

namespace Macagoraga\Bootstrapkit;

use Pagekit\Framework\Application;
use Pagekit\Theme\Theme;

class BootstrapkitTheme extends Theme
{
  /**
   * @var array
   */
  protected $classes;

  /**
   * {@inheritdoc}
   */
  public function boot(Application $app)
  {
    parent::boot($app);

    $app->on('system.site', function() use ($app) {

      $app->on('view.layout', function($event) use ($app) {

        $event->setParameter('theme', $app['theme.site']);

      });

    });
  }

  public function getClasses()
  {
    if (null !== $this->classes) {
      return $this->classes;
    }

    $sidebars = array_replace_recursive([
      'sidebar-a' => ['width' => 2, 'alignment' => 'left'],
      'sidebar-b' => ['width' => 3, 'alignment' => 'right']
    ], $this->getParams('sidebars', []));
    $columns  = ['main' => ['width' => 12, 'alignment' => 'right']];

    $sections = $this['view.sections'];
    foreach ($sidebars as $name => $sidebar) {
      if (!$sections->has($name)) {
        unset($sidebars[$name]);
        continue;
      }

      $columns['main']['width'] -= @$sidebar['width'];
    }

    $columns += $sidebars;

    foreach ($columns as $name => &$column) {

      $column['width']     = isset($column['width']) ? $column['width'] : 0;
      $column['alignment'] = isset($column['alignment']) ? $column['alignment'] : 'left';

      $shift = 0;
      foreach (($column['alignment'] == 'left' ? $columns : array_reverse($columns, true)) as $n => $col) {

        if ($name == $n) break;
        if (@$col['alignment'] != $column['alignment']) {
          $shift += @$col['width'];
        }
      }
      $column['class'] = sprintf('col-%s col-xs-12 col-md-%s%s', $name, $column['width'], $shift ? ' col-md-'.($column['alignment'] == 'left' ? 'pull' : 'push').'-'.$shift : '');
    }

    $this->classes = compact('columns');
    return $this->classes;
  }
}
