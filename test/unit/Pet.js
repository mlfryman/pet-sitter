/* jshint expr:true */
/* global describe, it */

'use strict';

//imports Chai library expect and Pet constructor
var expect = require('chai').expect;
var Pet = require('../../app/models/pet');

describe('Pet', function(){
  describe('constructor', function(){
    it('should create a new Pet', function(){
      var pet = new Pet();
      expect(pet).to.be.ok;
      expect(pet).to.be.instanceof(Pet);
    });
    it('should create a Pet with arguments', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
        expect(pet.name).to.equal('fluffy');
        expect(pet.age).to.equal(3);
        expect(pet.gender).to.equal('female');
        expect(pet.species).to.equal('lizard');
        expect(pet.isZombie).to.be.false;
        expect(pet.wins).to.be.equal(0);

        expect(pet.health).to.be.within(10, 100);
        expect(pet.energy).to.be.within(10, 100);
        expect(pet.full).to.be.within(10, 100);
    });
  });
  
  describe('#walk', function(){
    it('should increase health but decrease energy and full', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy  = 30;
      pet.full   = 20;
      
      pet.walk();

      expect(pet.health).to.be.within(91,93);
      expect(pet.energy).to.be.within(26,28);
      expect(pet.full).to.be.within(15,17);
    });
  });

  describe('#sleep', function(){
    it('should increase health and energy but decrease full', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy  = 30;
      pet.full   = 20;
      
      pet.sleep();

      expect(pet.health).to.be.within(92,93);
      expect(pet.energy).to.be.within(31,35);
      expect(pet.full).to.be.within(13,16);
    });
  });

  describe('#eat', function(){
    it('should increase health and full but decrease energy', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy  = 30;
      pet.full   = 20;
      
      pet.eat();

      expect(pet.health).to.be.within(91,94);
      expect(pet.energy).to.be.within(22,27);
      expect(pet.full).to.be.within(25,29);
    });
  });

  describe('#attack', function(){
    it('should allow pets to cage fight', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      fluffy.health = 45;
      fluffy.energy  = 60;
      fluffy.full   = 90;
      
      var baxter = new Pet('baxter', 5, 'male', 'monkey');
      baxter.health = 70;
      baxter.energy  = 50;
      baxter.full   = 80;
      
      fluffy.attack(baxter);

      expect(baxter.health).to.be.within(54.5, 59.5);
      expect(baxter.isZombie).to.be.false;
    });

    //pet is attacked until it turns a pet into a zombie

    it('should cause a pet with negative health to become a zombie', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      var baxter = new Pet('baxter', 5, 'male', 'monkey');

      for(var i = 0; i < 1000; i++){
        fluffy.attack(baxter);}

      expect(baxter.isZombie).to.be.true;
      expect(fluffy.wins).to.equal(1);
    });

    it('should allow a zombie pet to attack', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      fluffy.health = 50;

      var baxter = new Pet('baxter', 5, 'male', 'monkey');
      baxter.isZombie = true;

      baxter.attack(fluffy);

      expect(fluffy.health).to.be.within(45,50);
      expect(fluffy.isZombie).to.be.false;
    });

  });

  describe('#resurrect', function(){
    it('should resurrect the pet', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      fluffy.isZombie = true;
      fluffy.wins = 8;

      fluffy.resurrect();

      expect(fluffy.isZombie).to.be.false;
      expect(fluffy.wins).to.equal(3);
      expect(fluffy.health).to.be.within(25,50);
    });

    it('should not resurrect the pet', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      //test when pet is a zombie
      fluffy.isZombie = true;
      fluffy.wins = 8;

      fluffy.resurrect();

      expect(fluffy.isZombie).to.be.false;
      expect(fluffy.wins).to.equal(3);
    });

    it('should not resurrect the pet', function(){
      var fluffy = new Pet('fluffy', 3, 'female', 'sloth');
      fluffy.isZombie = false;
      //test when wins < 5
      fluffy.wins = 3;

      fluffy.resurrect();
      
      expect(fluffy.isZombie).to.be.false;
      expect(fluffy.wins).to.equal(3);
    });
  });
});
