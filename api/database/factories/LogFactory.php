<?php

use Faker\Generator as Faker;

$factory->define(App\Log::class, function (Faker $faker) {
    return [
        'user' => $faker->user,
        'task' => $faker->task,
        'family' => $faker->family,
    ];
});
