import test from 'ava';
import fiona from '../fiona.js';

test('sanity', t => {
  t.true(true + true === 2);
});

test('import', t => {
  t.true(typeof fiona === 'function');
});

test('fiona.fn.title', t => {
  t.is(fiona(1).title(), 'Sir');
  t.is(fiona(1).title({}), 'Sir');
  t.is(fiona(2).title(), 'Miss');
  t.is(fiona(2).title({}), 'Miss');
  t.is(fiona(4).title({ gender: 'f' }), 'Ms');
  t.is(fiona(4).title({ gender: 'm' }), 'Sir');
  t.is(fiona(4).title({ gender: 'Male' }), 'Sir');
});

test('fiona.fn.firstname', t => {
  t.is(fiona(1).firstname(), 'Hamish');
  t.is(fiona(1).firstname({}), 'Hamish');
  t.is(fiona(2).firstname(), 'Ava');
  t.is(fiona(2).firstname({}), 'Ava');
  t.is(fiona(2).firstname({ gender: 'f' }), 'Leah');
  t.is(fiona(2).firstname({ gender: 'm' }), 'Angus');
  t.is(fiona(2).firstname({ gender: 'Male' }), 'Angus');
});

test('fiona.fn.firstnames', t => {
  t.is(fiona(1).firstnames(), 'Hamish');
});

test('fiona.fn.surname', t => {
  t.is(fiona(1).surname(), 'Scott');
  t.is(fiona(2).surname(), 'Reid');
});

test('fiona.fn.gender', t => {
  t.is(fiona(1).gender(), 'male');
  t.is(fiona(2).gender(), 'female');
});

test('fiona.fn.name', t => {
  t.is(fiona(1).name(), 'Sir Kyle Moon');
});
