<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Family extends JsonResource
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
            'admin' => $this->admin,
            'best_score' => $this->best_score,
        ];

        // return parent::toArray($request);
    }
}
