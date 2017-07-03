using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameOfDrones.Models;

namespace GameOfDrones.Controllers
{
    [Produces("application/json")]
    [Route("api/GameScore")]
    public class GameScoreController : Controller
    {
        private static GameScore[] _gameScores = new GameScore[] {
            new GameScore { round= 1, winner = "Obama"},
            new GameScore { round= 2, winner= "Uribe"},
            new GameScore { round = 3, winner= "Trump"}
        };

        /// <summary>
        /// If we want to return from data api 
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public IActionResult GetGameScores()
        {
            //just a test but actually for this demo we are using browser's localstorage
            return new ObjectResult(_gameScores);
        }
    }

    
}