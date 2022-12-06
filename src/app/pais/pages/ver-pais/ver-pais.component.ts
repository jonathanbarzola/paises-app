import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { Country } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)
      )
      .subscribe((pais) => (this.pais = pais));

    //   this.activatedRoute.params
    //     .subscribe( ({ id }) => {
    //       console.log(id);

    //       this.paisService.getPaisPorAlpha(id)
    //         .subscribe( pais => {
    //           console.log(pais);
    //         })
    //     })
    
  }

  get moneda() {
    return Object.values(this.pais[0].currencies)[0].name;
  }

  get traducciones() {
    return Object.values(this.pais[0].translations);
  }

  get idioma() {
    return Object.values(this.pais[0].languages).map(idioma => " " + idioma).toString();
  }
}
