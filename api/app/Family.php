<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    protected $fillable = [
        'name', 'password', 'admin', 'best_score',
    ];

    protected $hidden = [
        'password',
    ];

    protected $table = 'familys';
}
