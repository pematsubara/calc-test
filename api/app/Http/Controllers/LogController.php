<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Log;
use Tymon\JWTAuth\JWTAuth;
use DB;

class LogController extends Controller
{
    /**
     * @var JWTAuth
     */
    private $jwtAuth;

    public function __construct(JWTAuth $jwtAuth) {
        $this->jwtAuth = $jwtAuth;
    }


    public function getUserByToken() {

	    if (! $user = $this->jwtAuth->parseToken()->authenticate()) {
		    return response()->json(['error' => 'user_not_found'], 404);
        }

        // $user = $user->family;
        return $user;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $logs = DB::table('logs')->where('family', $this->getUserByToken()->family)->get();
        return response()->json(compact('logs'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $log = new Log;

        $log->user = $this->getUserByToken()->id;
        $log->task = $request->input('task', 1);
        $log->family = $this->getUserByToken()->family;
        $log->score = $request->input('score', 1);

        if ($log->save()) {
            return $this->index();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $logs = DB::table('logs')->where('user', $id)->get();
        return response()->json(compact('logs'));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $log = Log::findOrFail($id);
        $userID = $this->getUserByToken()->id;
        if ( $userID == $log->user ) {
            if ($log->delete()) {
                return $this->index();
            }
        } else {
            return "Hacking it isn't allowed!";
        }
    }
}
