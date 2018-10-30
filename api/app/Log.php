<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'user', 'task', 'family', 'score',
    ];

    protected $table = 'logs';
}
