(function () {

  "use strict";

  var initialize = function (moment) {
    moment.fn.vendrediSaint = function (Y){
      if (Y === undefined) {
        Y = this.year();
      }
      return moment.fn.paques(Y).add(-2, "days")
    }

    moment.fn.saintEtienne = function (Y){
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("26-12-" + Y, "DD-MM-YYYY");
    }

    var listeFerie = {
      "Jour de l'an": moment.fn.jourDeLAn,
      "Fête du travail": moment.fn.feteDuTravail,
      "Victoire des alliés": moment.fn.victoireDeAllies,
      "Fête Nationale": moment.fn.feteNationale,
      "Assomption": moment.fn.assomption,
      "Toussaint": moment.fn.toussaint,
      "Armistice": moment.fn.armistice,
      "Noël": moment.fn.noel,
      "Pâques": moment.fn.paques,
      "Lundi de Pâques": moment.fn.lundiDePaques,
      "Ascension": moment.fn.ascension,
      "Pentecôte": moment.fn.pentecote,
      "Vendredi Saint":moment.fn.vendrediSaint,
      "Saint Etienne": moment.fn.saintEtienne
    };

    moment.fn.getFerieList = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }

      var res = [];
      for (var key in listeFerie) {
        if (listeFerie.hasOwnProperty(key)) {
          res.push({name: key, date: listeFerie[key](Y) });
        }
      }
      return res;
    };

    moment.fn.getFerie = function () {
      for (var key in listeFerie) {
        if (listeFerie.hasOwnProperty(key)) {
          if (this.isSame(listeFerie[key].call(this), 'days')) {
            return key;
          }
        }
      }
      return null;
    };

    moment.fn.isFerie = function () {
      return (this.getFerie() !== null);
    };

    moment.fn.isWeekEnd = function () {
      return (this.day() === 0 || this.day() === 6);
    };

    moment.fn.isWorkingDay = function () {
      return (!this.isWeekEnd() && !this.isFerie());
    };

    return moment;
  };

  if (typeof define === "function" && define.amd) {
    define("moment-ferie-alsace-moselle", ["moment-ferie-fr"], function (moment) {
      return this.moment = initialize(moment);
    });
  } else if (typeof module !== "undefined") {
    module.exports = initialize(require("moment-ferie-fr"));
  } else if (typeof window !== "undefined" && window.moment) {
    this.moment = initialize(this.moment);
  }

}).call(this);
