<?php

use Faker\Generator as Faker;

$factory->define(App\Task::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'family' => $faker->family,
        'score' => 0,
        'last_user' => 'ninguem',
        'frequency' => 86400,
    ];
});
