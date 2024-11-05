<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: [
            __DIR__ . '/../routes/web.php',
            __DIR__ . '/../routes/Admin/admin.php',
            __DIR__ . '/../routes/Admin/admin-api.php',
            __DIR__ . '/../routes/TestApi/TestApi.php',
            __DIR__ . '/../routes/TestApi/TestApi_api.php',
            // Thêm các tệp routes web khác nếu cần
        ],
        api: [
            __DIR__ . '/../routes/api.php',
            // Thêm các tệp routes API khác nếu cần
        ],
        channels: __DIR__ . '/../routes/channels.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\VerifyCsrfToken::class, // Ensure CSRF middleware is added here
        ]);
        // Các cấu hình middleware khác nếu cần...
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Cấu hình xử lý ngoại lệ nếu cần...
    })
    ->create();