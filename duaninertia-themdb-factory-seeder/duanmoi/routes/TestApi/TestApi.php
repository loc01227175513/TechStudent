<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestApi\TestApi;

Route::prefix('TestApi')->group(function () {
    Route::get('TestApi', [TestApi::class, 'index'])->name('testapi');
});