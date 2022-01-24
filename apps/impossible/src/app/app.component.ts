/* eslint-disable no-inner-declarations */
import { AfterViewInit, Component } from '@angular/core';

interface Bullet {
  destroyed: boolean;
  deg: number;
  x: number;
  y: number;
  realX: number;
  realY: number;
}

//Vanilla JS
//PLAY IN FULL PAGE VIEW!

@Component({
  selector: 'death-tower-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'impossible';

  ngAfterViewInit() {
    //General sprite load
    const sprite = new Image();
    const spriteExplosion = new Image();
    sprite.src =
      'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';

    window.onload = function () {
      spriteExplosion.src =
        'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/explosion_g9ncyg.png';
    };

    //Game
    //Canvas
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      let cH = (ctx.canvas.height = window.innerHeight);
      let cW = (ctx.canvas.width = window.innerWidth);

      //Game
      let bullets: Bullet[] = [];
      let asteroids: any[] = [];
      let explosions = [],
        destroyed = 0,
        record = 0,
        count = 0,
        playing = false,
        gameOver = false;

      const _planet = { deg: 0 };

      //Player
      const player = {
        posX: -35,
        posY: -(100 + 82),
        width: 70,
        height: 79,
        deg: 0,
      };

      const update = () => {
        cH = ctx.canvas.height = window.innerHeight;
        cW = ctx.canvas.width = window.innerWidth;
      };

      const move = (e: { offsetX: number; offsetY: number }) => {
        player.deg = Math.atan2(e.offsetX - cW / 2, -(e.offsetY - cH / 2));
      };

      const action = (e: {
        preventDefault: () => void;
        offsetX: number;
        offsetY: number;
        type: string;
      }) => {
        e.preventDefault();
        if (playing) {
          const bullet = {
            x: -8,
            y: -179,
            sizeX: 2,
            sizeY: 10,
            realX: e.offsetX,
            realY: e.offsetY,
            dirX: e.offsetX,
            dirY: e.offsetY,
            deg: Math.atan2(e.offsetX - cW / 2, -(e.offsetY - cH / 2)),
            destroyed: false,
          };

          bullets.push(bullet);
        } else {
          let dist;
          if (gameOver) {
            dist = Math.sqrt(
              (e.offsetX - cW / 2) * (e.offsetX - cW / 2) +
                (e.offsetY - (cH / 2 + 45 + 22)) *
                  (e.offsetY - (cH / 2 + 45 + 22))
            );
            if (dist < 27) {
              if (e.type == 'click') {
                gameOver = false;
                count = 0;
                bullets = [];
                asteroids = [];
                explosions = [];
                destroyed = 0;
                player.deg = 0;
                canvas.removeEventListener('contextmenu', action);
                canvas.removeEventListener('mousemove', move);
                canvas.style.cursor = 'default';
              } else {
                canvas.style.cursor = 'pointer';
              }
            } else {
              canvas.style.cursor = 'default';
            }
          } else {
            dist = Math.sqrt(
              (e.offsetX - cW / 2) * (e.offsetX - cW / 2) +
                (e.offsetY - cH / 2) * (e.offsetY - cH / 2)
            );

            if (dist < 27) {
              if (e.type == 'click') {
                playing = true;
                canvas.removeEventListener('mousemove', action);
                canvas.addEventListener('contextmenu', action);
                canvas.addEventListener('mousemove', move);
                canvas.setAttribute('class', 'playing');
                canvas.style.cursor = 'default';
              } else {
                canvas.style.cursor = 'pointer';
              }
            } else {
              canvas.style.cursor = 'default';
            }
          }
        }
      };

      canvas.addEventListener('click', action);
      canvas.addEventListener('mousemove', action);
      window.addEventListener('resize', update);

      const sun = () => {
        let distance: number;

        bullets.forEach((bullet) => {
          if (!bullet.destroyed) {
            ctx.save();
            ctx.translate(cW / 2, cH / 2);
            ctx.rotate(bullet.deg);

            ctx.drawImage(
              sprite,
              211,
              100,
              50,
              75,
              bullet.x,
              (bullet.y -= 20),
              19,
              30
            );

            ctx.restore();

            const sine = Math.sin(bullet.deg);
            const cosine = Math.cos(bullet.deg);

            //Real coords
            bullet.realX = 0 - (bullet.y + 10) * sine;
            bullet.realY = 0 + (bullet.y + 10) * cosine;

            bullet.realX += cW / 2;
            bullet.realY += cH / 2;

            //Collision
            for (let j = 0; j < asteroids.length; j++) {
              if (!asteroids[j].destroyed) {
                distance = Math.sqrt(
                  Math.pow(asteroids[j].realX - bullet.realX, 2) +
                    Math.pow(asteroids[j].realY - bullet.realY, 2)
                );

                if (
                  distance <
                  asteroids[j].width / asteroids[j].size / 2 - 4 + (19 / 2 - 4)
                ) {
                  destroyed += 1;
                  asteroids[j].destroyed = true;
                  bullet.destroyed = true;
                  explosions.push(asteroids[j]);
                }
              }
            }
          }
        });

        for (let i = 0; i < bullets.length; i++) {
          if (!bullets[i].destroyed) {
            ctx.save();
            ctx.translate(cW / 2, cH / 2);
            ctx.rotate(bullets[i].deg);

            ctx.drawImage(
              sprite,
              211,
              100,
              50,
              75,
              bullets[i].x,
              (bullets[i].y -= 20),
              19,
              30
            );

            ctx.restore();

            const sine = Math.sin(bullets[i].deg);
            const cosine = Math.cos(bullets[i].deg);

            //Real coords
            bullets[i].realX = 0 - (bullets[i].y + 10) * sine;
            bullets[i].realY = 0 + (bullets[i].y + 10) * cosine;

            bullets[i].realX += cW / 2;
            bullets[i].realY += cH / 2;

            //Collision
            for (let j = 0; j < asteroids.length; j++) {
              if (!asteroids[j].destroyed) {
                distance = Math.sqrt(
                  Math.pow(asteroids[j].realX - bullets[i].realX, 2) +
                    Math.pow(asteroids[j].realY - bullets[i].realY, 2)
                );

                if (
                  distance <
                  asteroids[j].width / asteroids[j].size / 2 - 4 + (19 / 2 - 4)
                ) {
                  destroyed += 1;
                  asteroids[j].destroyed = true;
                  bullets[i].destroyed = true;
                  explosions.push(asteroids[j]);
                }
              }
            }
          }
        }
      };

      const fire = () => {
        let distance;

        for (let i = 0; i < bullets.length; i++) {
          if (!bullets[i].destroyed) {
            ctx.save();
            ctx.translate(cW / 2, cH / 2);
            ctx.rotate(bullets[i].deg);

            ctx.drawImage(
              sprite,
              211,
              100,
              50,
              75,
              bullets[i].x,
              (bullets[i].y -= 20),
              19,
              30
            );

            ctx.restore();

            //Real coords
            bullets[i].realX =
              0 - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
            bullets[i].realY =
              0 + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

            bullets[i].realX += cW / 2;
            bullets[i].realY += cH / 2;

            //Collision
            for (let j = 0; j < asteroids.length; j++) {
              if (!asteroids[j].destroyed) {
                distance = Math.sqrt(
                  Math.pow(asteroids[j].realX - bullets[i].realX, 2) +
                    Math.pow(asteroids[j].realY - bullets[i].realY, 2)
                );

                if (
                  distance <
                  asteroids[j].width / asteroids[j].size / 2 - 4 + (19 / 2 - 4)
                ) {
                  destroyed += 1;
                  asteroids[j].destroyed = true;
                  bullets[i].destroyed = true;
                  explosions.push(asteroids[j]);
                }
              }
            }
          }
        }
      };

      const planet = () => {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 100;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = '#999';

        ctx.arc(cW / 2, cH / 2, 100, 0, Math.PI * 2);
        ctx.fill();

        //Planet rotation
        ctx.translate(cW / 2, cH / 2);
        ctx.rotate((_planet.deg += 0.1) * (Math.PI / 180));
        ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200);
        ctx.restore();
      };

      const _player = () => {
        ctx.save();
        ctx.translate(cW / 2, cH / 2);

        ctx.rotate(player.deg);
        ctx.drawImage(
          sprite,
          200,
          0,
          player.width,
          player.height,
          player.posX,
          player.posY,
          player.width,
          player.height
        );

        ctx.restore();

        if (bullets.length - destroyed && playing) {
          fire();
        }
      };

      const newAsteroid = () => {
        const type = random(1, 4);
        let coordsX;
        let coordsY;

        switch (type) {
          case 1:
            coordsX = random(0, cW);
            coordsY = 0 - 150;
            break;
          case 2:
            coordsX = cW + 150;
            coordsY = random(0, cH);
            break;
          case 3:
            coordsX = random(0, cW);
            coordsY = cH + 150;
            break;
          case 4:
            coordsX = 0 - 150;
            coordsY = random(0, cH);
            break;
        }

        if (coordsX && coordsY) {
          const asteroid = {
            x: 278,
            y: 0,
            state: 0,
            stateX: 0,
            width: 134,
            height: 123,
            realX: coordsX,
            realY: coordsY,
            moveY: 0,
            coordsX: coordsX,
            coordsY: coordsY,
            size: random(1, 3),
            deg: Math.atan2(coordsX - cW / 2, -(coordsY - cH / 2)),
            destroyed: false,
          };
          asteroids.push(asteroid);
        }
      };

      const _asteroids = () => {
        let distance;

        for (let i = 0; i < asteroids.length; i++) {
          if (!asteroids[i].destroyed) {
            ctx.save();
            ctx.translate(asteroids[i].coordsX, asteroids[i].coordsY);
            ctx.rotate(asteroids[i].deg);

            ctx.drawImage(
              sprite,
              asteroids[i].x,
              asteroids[i].y,
              asteroids[i].width,
              asteroids[i].height,
              -(asteroids[i].width / asteroids[i].size) / 2,
              (asteroids[i].moveY += 1 / asteroids[i].size),
              asteroids[i].width / asteroids[i].size,
              asteroids[i].height / asteroids[i].size
            );

            ctx.restore();

            //Real Coords
            asteroids[i].realX =
              0 -
              (asteroids[i].moveY +
                asteroids[i].height / asteroids[i].size / 2) *
                Math.sin(asteroids[i].deg);
            asteroids[i].realY =
              0 +
              (asteroids[i].moveY +
                asteroids[i].height / asteroids[i].size / 2) *
                Math.cos(asteroids[i].deg);

            asteroids[i].realX += asteroids[i].coordsX;
            asteroids[i].realY += asteroids[i].coordsY;

            //Game over
            distance = Math.sqrt(
              Math.pow(asteroids[i].realX - cW / 2, 2) +
                Math.pow(asteroids[i].realY - cH / 2, 2)
            );
            if (
              distance <
              asteroids[i].width / asteroids[i].size / 2 - 4 + 100
            ) {
              gameOver = true;
              playing = false;
              canvas.addEventListener('mousemove', action);
            }
          } else if (!asteroids[i].extinct) {
            explosion(asteroids[i]);
          }
        }

        if (asteroids.length - destroyed < 10 + Math.floor(destroyed / 6)) {
          newAsteroid();
        }
      };

      const explosion = (asteroid: {
        realX: number;
        realY: number;
        deg: number;
        state: number;
        stateX: number;
        width: number;
        size: number;
        height: number;
        extinct: boolean;
      }) => {
        ctx.save();
        ctx.translate(asteroid.realX, asteroid.realY);
        ctx.rotate(asteroid.deg);

        let spriteY,
          spriteX = 256;
        if (asteroid.state == 0) {
          spriteY = 0;
          spriteX = 0;
        } else if (asteroid.state < 8) {
          spriteY = 0;
        } else if (asteroid.state < 16) {
          spriteY = 256;
        } else if (asteroid.state < 24) {
          spriteY = 512;
        } else {
          spriteY = 768;
        }

        if (
          asteroid.state == 8 ||
          asteroid.state == 16 ||
          asteroid.state == 24
        ) {
          asteroid.stateX = 0;
        }

        ctx.drawImage(
          spriteExplosion,
          (asteroid.stateX += spriteX),
          spriteY,
          256,
          256,
          -(asteroid.width / asteroid.size) / 2,
          -(asteroid.height / asteroid.size) / 2,
          asteroid.width / asteroid.size,
          asteroid.height / asteroid.size
        );
        asteroid.state += 1;

        if (asteroid.state == 31) {
          asteroid.extinct = true;
        }

        ctx.restore();
      };

      const start = () => {
        if (!gameOver) {
          //Clear
          ctx.clearRect(0, 0, cW, cH);
          ctx.beginPath();

          //Planet
          planet();

          //Player
          _player();

          if (playing) {
            _asteroids();

            ctx.font = '20px Verdana';
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            ctx.fillText('Record: ' + record + '', 20, 30);

            ctx.font = '40px Verdana';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.strokeText('' + destroyed + '', cW / 2, cH / 2);
            ctx.fillText('' + destroyed + '', cW / 2, cH / 2);
          } else {
            ctx.drawImage(
              sprite,
              428,
              12,
              70,
              70,
              cW / 2 - 35,
              cH / 2 - 35,
              70,
              70
            );
          }
        } else if (count < 1) {
          count = 1;
          ctx.fillStyle = 'rgba(0,0,0,0.75)';
          ctx.rect(0, 0, cW, cH);
          ctx.fill();

          ctx.font = '60px Verdana';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('GAME OVER', cW / 2, cH / 2 - 150);

          ctx.font = '20px Verdana';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('Total destroyed: ' + destroyed, cW / 2, cH / 2 + 140);

          record = destroyed > record ? destroyed : record;

          ctx.font = '20px Verdana';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('RECORD: ' + record, cW / 2, cH / 2 + 185);

          ctx.drawImage(
            sprite,
            500,
            18,
            70,
            70,
            cW / 2 - 35,
            cH / 2 + 40,
            70,
            70
          );

          canvas.removeAttribute('class');
        }
      };

      function init() {
        window.requestAnimationFrame(init);
        start();
      }

      init();

      //Utils
      function random(from: number, to: number) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
      }

      if (~window.location.href.indexOf('full')) {
        const full = document.getElementsByTagName('a');
        full[0].setAttribute('style', 'display: none');
      }
    }
  }
}
