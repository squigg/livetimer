@extends('master')
@section('content')
  <h1>Timers</h1>
  <ul>
    @foreach($timers as $timer)
      <li>{{ $timer->name }}</li>
    @endforeach
  </ul>
@stop
