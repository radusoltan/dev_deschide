<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:200',
            'lead' => 'string',
            'body' => 'required|string',
            'is_breaking' => 'boolean',
            'is_alert' => 'boolean',
            'is_flash' => 'boolean',
            'status' => 'string',
            'locale' => 'required|string|max:2',
        ];
    }
}
