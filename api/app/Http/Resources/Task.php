<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Task extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'family' => $this->family,
            'score' => $this->score,
            'last_user' => $this->last_user,
            'frequency' => $this->frequency,
            'icon' => $this->icon,
        ];

        // return parent::toArray($request);
    }
}
