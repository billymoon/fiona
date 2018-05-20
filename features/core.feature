Feature: Core functionality
  In order to generate pseudo random data
  As a developer
  I want to use core features of fiona

  Scenario: test fixtures for fiona.fn.number
    Given fixture is loaded
    When every fixture is iterated
    Then the result should match the fixtures

  Scenario Outline: use fiona.fn.number to get repeatable whole numbers
    Given fiona is seeded with <seed>
    When the "number" method is called
    Then the result should be fixture <seed> number 1
    When the "number" method is called
    Then the result should be fixture <seed> number 2
    When the "number" method is called
    Then the result should be fixture <seed> number 3
    When the "number" method is called
    Then the result should be fixture <seed> number 4
    When the "number" method is called
    Then the result should be fixture <seed> number 5

    Examples:
      | seed            |
      | "fionas number" |
      | "short string"  |
      | "long string"   |

  Scenario Outline: use fiona.fn.number to get repeatable whole numbers
    Given fiona is seeded with <seed>
    When the "number" method is called
    Then the result should be whole number <result1>
    And the "number" method is called
    Then the result should be whole number <result2>
    And the "number" method is called
    Then the result should be whole number <result3>

    Examples:
      | seed            | result1 | result2 | result3 |
      | "fionas number" | 123814  | 690170  | 578565  |
      | "short string"  | 64758   | 733076  | 63495   |
      | "long string"   | 803577  | 380151  | 971316  |

  Scenario Outline: use fiona.fn.random to get repeatable decimal numbers
    Given fiona is seeded with <seed>
    When the "random" method is called
    Then the result should be decimal number <result1>
    When the "random" method is called
    Then the result should be decimal number <result2>
    When the "random" method is called
    Then the result should be decimal number <result3>

    Examples:
      | seed            | result1             | result2             | result3             |
      | "fionas number" | 0.12381471559582963 | 0.6901697952720196  | 0.5785648527455353  |
      | "short string"  | 0.06475870826503202 | 0.7330754165226013  | 0.06349565184837937 |
      | "long string"   | 0.8035769396478203  | 0.38015130599036406 | 0.9713152395427763  |
