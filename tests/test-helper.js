import Application from 'toy-robot-simulator/app';
import config from 'toy-robot-simulator/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
