<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name', 'family', 'score', 'last_user', 'frequency', 'icon',
    ];

    protected $table = 'tasks';
}
