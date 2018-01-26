<?php namespace App\Http\Responses;

use App\Timer;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Collection;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 05/12/17
 * Time: 22:48
 */
class BaseResponse implements Responsable
{

    /**
     * @var Timer|Collection
     */
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function toResponse($request)
    {
        return response()->json($this->transform(), 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * @return Jsonable|Arrayable
     */
    public function transform()
    {
        if ($this->data instanceof Collection) {
            return $this->data->map(function ($trigger) {
                return $this->transformOne($trigger);
            });
        } else {
            return $this->transformOne($this->data);
        }
    }

    /**
     * @param $data
     * @return Jsonable|Arrayable
     */
    protected function transformOne($data)
    {
        return $data;
    }

}
