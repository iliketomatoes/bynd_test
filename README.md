Code challenge for Beyond
=========================

Angular 2 Playlist application, written in Typescript. 

## Getting started

Download or clone this repository, then install the *package.json* dependencies with then
following command:

`$ make install`

Then compile the application:

`$ make build-aot-prod`

If for some reason the Ahead-of-Time compilation is failing, please use the alternative command:

`$ make build-prod`

## Serve the application

`$ make serve`

### Known issues

Using the *srcset* HTML property for multi-serving images inside Angular 2 components is not working on Firefox browsers at the moment.
