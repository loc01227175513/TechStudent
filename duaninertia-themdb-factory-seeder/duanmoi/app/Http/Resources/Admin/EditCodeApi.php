<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditCodeApi extends JsonResource
{
    protected $fileContent;

    public function __construct($resource, $fileContent)
    {
        parent::__construct($resource);
        $this->fileContent = $fileContent;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'fileContent' => $this->fileContent,
        ];
    }
}