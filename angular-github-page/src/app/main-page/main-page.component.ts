import { Component } from '@angular/core';
import { Card } from '../simple-card/card';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public experiences = [
    new Card('Coveo Blitz 2021', 'Team Hackathon', '/assets/imgs/blitz.png'),
    new Card('Coveo Blitz 2022', 'Team Hackathon', '/assets/imgs/blitz2022.jpg'),
    new Card('Mogile Technologies', 'Full-stack internship using MEVN (Mongo, Express, Vue, Node)', '/assets/imgs/mogile.jpg'),
    new Card('Morgan Stanley', 'Python Development Focusing on SRE tooling', '/assets/imgs/ms.jpg')
  ]
  public projects = [
    new Card('Discord Notes', 'Multi-user drawing application using Socket.IO, NodeJS, Bootstrap, Heroku & Discord.py', '/assets/imgs/draw.png', 'https://github.com/ArthurMousatov/DiscordNotes'),
    new Card('Marching Cubes Demo', 'Marching Cubes Interactive Demo using Three JS & React', '/assets/imgs/marching.gif', null, false, 'marching-cubes'),
  ]
}
