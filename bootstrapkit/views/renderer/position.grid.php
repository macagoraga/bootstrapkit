<?php

$widths = [
    ['12'],
    ['6', '6'],
    ['4', '4', '4'],
    ['3', '3', '3', '3'],
    ['5th', '5th', '5th', '5th', '5th'],
    ['2', '2', '2', '2', '2', '2']
];

$i      = 0;
$output = [];
$count  = count($value);
$width  = isset($widths[($count-1)]) ? $widths[($count-1)] : array_pad([], $count, '2');

foreach ($value as $widget) {

    $class     = $width[$i];

    $output[] = '<div class="col-md-'.$class.'">';
    $output[] =     '<div class="panel panel-default">';
    $output[] =         $widget->getShowTitle() ? '<div class="panel-heading"><h3 class="panel-title">'.$widget->getTitle().'</h3></div>':'';
    $output[] =         '<div class="panel-body">';
    $output[] =           $widget->render($options);
    $output[] =         '</div>';
    $output[] =     '</div>';
    $output[] = '</div>';

    $i++;
}

echo implode("\n", $output);