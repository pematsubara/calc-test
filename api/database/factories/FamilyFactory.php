<?php

use Faker\Generator as Faker;

$factory->define(App\Family::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'password' => $faker->password,
        'admin' => $faker->admin,
        'best_score' => 0,
    ];
});
