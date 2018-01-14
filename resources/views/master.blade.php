<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <base href="/">
  <link href="https://use.fontawesome.com/releases/v5.0.2/css/all.css" rel="stylesheet">
  <title>Timers</title>
</head>
<body>
@yield('content')
<script type="text/javascript" src="/inline.bundle.js"></script>
<script type="text/javascript" src="/polyfills.bundle.js"></script>
<script type="text/javascript" src="/styles.bundle.js"></script>
<script type="text/javascript" src="/vendor.bundle.js"></script>
<script type="text/javascript" src="/main.bundle.js"></script>
</body>
</html>
