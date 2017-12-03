@extends('master')
@section('content')
  <h1>Timer {{ $timer->name }}</h1>
  <app-root></app-root>
  <script type="text/javascript" src="/dist/main.bundle.js"></script>
@stop
