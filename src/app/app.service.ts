import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from './config/api.endpoints';
import { Observable } from 'rxjs/Observable';
import { Country, CountryOperator, Operator, Tier } from './app.models';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export class AppService {

    private countriesResult: CountryOperator[];

    constructor(private http: HttpClient) { }

    private loadCountries(): Observable<CountryOperator[]> {
        return this.http.get<CountryOperator[]>(ApiEndpoints.global.countries);
    }

    private countriesAdaptor(result: Observable<CountryOperator[]>): Observable<Country[]> {
        if (result) {
            return result.map(((objArray: CountryOperator[]) => {
                this.countriesResult = objArray;
                return objArray.map((obj => {
                    return {
                        country: obj.country,
                        country_code: obj.country_code,
                        iso: obj.iso
                    };
                })).reduce((acc, item) => {
                    if (acc.nameArr.indexOf(item.country) < 0) {
                        acc.countries.push(item);
                        acc.nameArr.push(item.country);
                    }
                    return acc;
                }, { countries: [], nameArr: [] });
            })).map(obj => obj.countries);
        } else {
            return Observable.empty<Country[]>();
        }
    }

    private operatorAdaptor(result: Observable<CountryOperator[]>, country: Country): Observable<Operator[]> {
        if (result) {
            return result.map((res: CountryOperator[]) => {
                return res.filter((co: CountryOperator) => co.country_code === country.country_code)
                    .map((c: CountryOperator) => new Operator(c.network, c.mcc, c.mnc));
            });
        } else {
            return Observable.empty<Operator[]>();
        }
    }

    getCountries(): Observable<Country[]> {
        if (!!this.countriesResult) {
            return this.countriesAdaptor(Observable.of(this.countriesResult));
        } else {
            return this.countriesAdaptor(this.loadCountries());
        }
    }

    getOperators(country: Country): Observable<Operator[]> {
        if (!!this.countriesResult) {
            return this.operatorAdaptor(Observable.of(this.countriesResult), country);
        } else {
            return this.operatorAdaptor(this.loadCountries(), country);
        }
    }

    getTiers(): Observable<Tier[]> {
        return this.http.get<Tier[]>(ApiEndpoints.global.tiers);
    }
}
