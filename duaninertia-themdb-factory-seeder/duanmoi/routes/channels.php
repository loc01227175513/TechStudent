<?php

use Illuminate\Support\Facades\Route;

Route::prefix('channels')->group(function () {
    Route::get('/my-new-route', function () {
        return 'Hello World';
    });
});