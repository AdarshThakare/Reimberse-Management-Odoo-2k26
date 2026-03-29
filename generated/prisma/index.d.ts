
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Currency
 * 
 */
export type Currency = $Result.DefaultSelection<Prisma.$CurrencyPayload>
/**
 * Model ExchangeRateCache
 * Caches exchange rates from the free exchangerate-api.com.
 * Key: (fromCurrencyId, toCurrencyId) — unique pair.
 * Refresh strategy: if fetchedAt > 1 hour ago, re-fetch.
 */
export type ExchangeRateCache = $Result.DefaultSelection<Prisma.$ExchangeRateCachePayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ExpenseCategory
 * 
 */
export type ExpenseCategory = $Result.DefaultSelection<Prisma.$ExpenseCategoryPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model ApprovalRule
 * Configurable approval policy. The admin creates these and
 * assigns them to expenses (or sets a default for the company).
 */
export type ApprovalRule = $Result.DefaultSelection<Prisma.$ApprovalRulePayload>
/**
 * Model ApprovalStep
 * A single approver position within an approval rule.
 * stepOrder defines the sequence (1 = first, 2 = second, ...).
 */
export type ApprovalStep = $Result.DefaultSelection<Prisma.$ApprovalStepPayload>
/**
 * Model ApprovalAction
 * Immutable record of every approval/rejection decision.
 * Append-only — past actions are never modified or deleted.
 */
export type ApprovalAction = $Result.DefaultSelection<Prisma.$ApprovalActionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ExpenseStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ExpenseStatus = (typeof ExpenseStatus)[keyof typeof ExpenseStatus]


export const ApprovalActionType: {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ApprovalActionType = (typeof ApprovalActionType)[keyof typeof ApprovalActionType]


export const ApprovalRuleType: {
  SEQUENTIAL: 'SEQUENTIAL',
  PERCENTAGE: 'PERCENTAGE',
  SPECIFIC: 'SPECIFIC',
  HYBRID: 'HYBRID'
};

export type ApprovalRuleType = (typeof ApprovalRuleType)[keyof typeof ApprovalRuleType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ExpenseStatus = $Enums.ExpenseStatus

export const ExpenseStatus: typeof $Enums.ExpenseStatus

export type ApprovalActionType = $Enums.ApprovalActionType

export const ApprovalActionType: typeof $Enums.ApprovalActionType

export type ApprovalRuleType = $Enums.ApprovalRuleType

export const ApprovalRuleType: typeof $Enums.ApprovalRuleType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Currencies
 * const currencies = await prisma.currency.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Currencies
   * const currencies = await prisma.currency.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.currency`: Exposes CRUD operations for the **Currency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Currencies
    * const currencies = await prisma.currency.findMany()
    * ```
    */
  get currency(): Prisma.CurrencyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exchangeRateCache`: Exposes CRUD operations for the **ExchangeRateCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeRateCaches
    * const exchangeRateCaches = await prisma.exchangeRateCache.findMany()
    * ```
    */
  get exchangeRateCache(): Prisma.ExchangeRateCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseCategory`: Exposes CRUD operations for the **ExpenseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseCategories
    * const expenseCategories = await prisma.expenseCategory.findMany()
    * ```
    */
  get expenseCategory(): Prisma.ExpenseCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalRule`: Exposes CRUD operations for the **ApprovalRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalRules
    * const approvalRules = await prisma.approvalRule.findMany()
    * ```
    */
  get approvalRule(): Prisma.ApprovalRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalStep`: Exposes CRUD operations for the **ApprovalStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalSteps
    * const approvalSteps = await prisma.approvalStep.findMany()
    * ```
    */
  get approvalStep(): Prisma.ApprovalStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalAction`: Exposes CRUD operations for the **ApprovalAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalActions
    * const approvalActions = await prisma.approvalAction.findMany()
    * ```
    */
  get approvalAction(): Prisma.ApprovalActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Currency: 'Currency',
    ExchangeRateCache: 'ExchangeRateCache',
    Company: 'Company',
    User: 'User',
    ExpenseCategory: 'ExpenseCategory',
    Expense: 'Expense',
    ApprovalRule: 'ApprovalRule',
    ApprovalStep: 'ApprovalStep',
    ApprovalAction: 'ApprovalAction',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "currency" | "exchangeRateCache" | "company" | "user" | "expenseCategory" | "expense" | "approvalRule" | "approvalStep" | "approvalAction" | "account" | "session" | "verificationToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Currency: {
        payload: Prisma.$CurrencyPayload<ExtArgs>
        fields: Prisma.CurrencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CurrencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CurrencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          findFirst: {
            args: Prisma.CurrencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CurrencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          findMany: {
            args: Prisma.CurrencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>[]
          }
          create: {
            args: Prisma.CurrencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          createMany: {
            args: Prisma.CurrencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CurrencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>[]
          }
          delete: {
            args: Prisma.CurrencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          update: {
            args: Prisma.CurrencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          deleteMany: {
            args: Prisma.CurrencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CurrencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CurrencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>[]
          }
          upsert: {
            args: Prisma.CurrencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrencyPayload>
          }
          aggregate: {
            args: Prisma.CurrencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurrency>
          }
          groupBy: {
            args: Prisma.CurrencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CurrencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CurrencyCountArgs<ExtArgs>
            result: $Utils.Optional<CurrencyCountAggregateOutputType> | number
          }
        }
      }
      ExchangeRateCache: {
        payload: Prisma.$ExchangeRateCachePayload<ExtArgs>
        fields: Prisma.ExchangeRateCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeRateCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          findFirst: {
            args: Prisma.ExchangeRateCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          findMany: {
            args: Prisma.ExchangeRateCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          create: {
            args: Prisma.ExchangeRateCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          createMany: {
            args: Prisma.ExchangeRateCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          delete: {
            args: Prisma.ExchangeRateCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          update: {
            args: Prisma.ExchangeRateCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          deleteMany: {
            args: Prisma.ExchangeRateCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeRateCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          upsert: {
            args: Prisma.ExchangeRateCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          aggregate: {
            args: Prisma.ExchangeRateCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeRateCache>
          }
          groupBy: {
            args: Prisma.ExchangeRateCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeRateCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeRateCacheCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeRateCacheCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ExpenseCategory: {
        payload: Prisma.$ExpenseCategoryPayload<ExtArgs>
        fields: Prisma.ExpenseCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findMany: {
            args: Prisma.ExpenseCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          create: {
            args: Prisma.ExpenseCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          createMany: {
            args: Prisma.ExpenseCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          update: {
            args: Prisma.ExpenseCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseCategory>
          }
          groupBy: {
            args: Prisma.ExpenseCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      ApprovalRule: {
        payload: Prisma.$ApprovalRulePayload<ExtArgs>
        fields: Prisma.ApprovalRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          findFirst: {
            args: Prisma.ApprovalRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          findMany: {
            args: Prisma.ApprovalRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>[]
          }
          create: {
            args: Prisma.ApprovalRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          createMany: {
            args: Prisma.ApprovalRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>[]
          }
          delete: {
            args: Prisma.ApprovalRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          update: {
            args: Prisma.ApprovalRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          deleteMany: {
            args: Prisma.ApprovalRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>[]
          }
          upsert: {
            args: Prisma.ApprovalRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRulePayload>
          }
          aggregate: {
            args: Prisma.ApprovalRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalRule>
          }
          groupBy: {
            args: Prisma.ApprovalRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalRuleCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRuleCountAggregateOutputType> | number
          }
        }
      }
      ApprovalStep: {
        payload: Prisma.$ApprovalStepPayload<ExtArgs>
        fields: Prisma.ApprovalStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          findFirst: {
            args: Prisma.ApprovalStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          findMany: {
            args: Prisma.ApprovalStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>[]
          }
          create: {
            args: Prisma.ApprovalStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          createMany: {
            args: Prisma.ApprovalStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>[]
          }
          delete: {
            args: Prisma.ApprovalStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          update: {
            args: Prisma.ApprovalStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalStepPayload>
          }
          aggregate: {
            args: Prisma.ApprovalStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalStep>
          }
          groupBy: {
            args: Prisma.ApprovalStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalStepCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalStepCountAggregateOutputType> | number
          }
        }
      }
      ApprovalAction: {
        payload: Prisma.$ApprovalActionPayload<ExtArgs>
        fields: Prisma.ApprovalActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          findFirst: {
            args: Prisma.ApprovalActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          findMany: {
            args: Prisma.ApprovalActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          create: {
            args: Prisma.ApprovalActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          createMany: {
            args: Prisma.ApprovalActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          delete: {
            args: Prisma.ApprovalActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          update: {
            args: Prisma.ApprovalActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          aggregate: {
            args: Prisma.ApprovalActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalAction>
          }
          groupBy: {
            args: Prisma.ApprovalActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalActionCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalActionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    currency?: CurrencyOmit
    exchangeRateCache?: ExchangeRateCacheOmit
    company?: CompanyOmit
    user?: UserOmit
    expenseCategory?: ExpenseCategoryOmit
    expense?: ExpenseOmit
    approvalRule?: ApprovalRuleOmit
    approvalStep?: ApprovalStepOmit
    approvalAction?: ApprovalActionOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CurrencyCountOutputType
   */

  export type CurrencyCountOutputType = {
    companies: number
    expenses: number
    exchangeRatesFrom: number
  }

  export type CurrencyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | CurrencyCountOutputTypeCountCompaniesArgs
    expenses?: boolean | CurrencyCountOutputTypeCountExpensesArgs
    exchangeRatesFrom?: boolean | CurrencyCountOutputTypeCountExchangeRatesFromArgs
  }

  // Custom InputTypes
  /**
   * CurrencyCountOutputType without action
   */
  export type CurrencyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrencyCountOutputType
     */
    select?: CurrencyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CurrencyCountOutputType without action
   */
  export type CurrencyCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }

  /**
   * CurrencyCountOutputType without action
   */
  export type CurrencyCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * CurrencyCountOutputType without action
   */
  export type CurrencyCountOutputTypeCountExchangeRatesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeRateCacheWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    categories: number
    approvalRules: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    categories?: boolean | CompanyCountOutputTypeCountCategoriesArgs
    approvalRules?: boolean | CompanyCountOutputTypeCountApprovalRulesArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountApprovalRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRuleWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    subordinates: number
    accounts: number
    sessions: number
    expenses: number
    approvalActions: number
    approvalSteps: number
    specificApproverFor: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subordinates?: boolean | UserCountOutputTypeCountSubordinatesArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    expenses?: boolean | UserCountOutputTypeCountExpensesArgs
    approvalActions?: boolean | UserCountOutputTypeCountApprovalActionsArgs
    approvalSteps?: boolean | UserCountOutputTypeCountApprovalStepsArgs
    specificApproverFor?: boolean | UserCountOutputTypeCountSpecificApproverForArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovalActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalActionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovalStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalStepWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSpecificApproverForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRuleWhereInput
  }


  /**
   * Count Type ExpenseCategoryCountOutputType
   */

  export type ExpenseCategoryCountOutputType = {
    expenses: number
  }

  export type ExpenseCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | ExpenseCategoryCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategoryCountOutputType
     */
    select?: ExpenseCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Count Type ExpenseCountOutputType
   */

  export type ExpenseCountOutputType = {
    approvalActions: number
  }

  export type ExpenseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvalActions?: boolean | ExpenseCountOutputTypeCountApprovalActionsArgs
  }

  // Custom InputTypes
  /**
   * ExpenseCountOutputType without action
   */
  export type ExpenseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCountOutputType
     */
    select?: ExpenseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseCountOutputType without action
   */
  export type ExpenseCountOutputTypeCountApprovalActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalActionWhereInput
  }


  /**
   * Count Type ApprovalRuleCountOutputType
   */

  export type ApprovalRuleCountOutputType = {
    steps: number
    expenses: number
  }

  export type ApprovalRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | ApprovalRuleCountOutputTypeCountStepsArgs
    expenses?: boolean | ApprovalRuleCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * ApprovalRuleCountOutputType without action
   */
  export type ApprovalRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRuleCountOutputType
     */
    select?: ApprovalRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApprovalRuleCountOutputType without action
   */
  export type ApprovalRuleCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalStepWhereInput
  }

  /**
   * ApprovalRuleCountOutputType without action
   */
  export type ApprovalRuleCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Currency
   */

  export type AggregateCurrency = {
    _count: CurrencyCountAggregateOutputType | null
    _min: CurrencyMinAggregateOutputType | null
    _max: CurrencyMaxAggregateOutputType | null
  }

  export type CurrencyMinAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
  }

  export type CurrencyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
  }

  export type CurrencyCountAggregateOutputType = {
    id: number
    name: number
    symbol: number
    _all: number
  }


  export type CurrencyMinAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
  }

  export type CurrencyMaxAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
  }

  export type CurrencyCountAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    _all?: true
  }

  export type CurrencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Currency to aggregate.
     */
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
     */
    orderBy?: CurrencyOrderByWithRelationInput | CurrencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Currencies
    **/
    _count?: true | CurrencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CurrencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CurrencyMaxAggregateInputType
  }

  export type GetCurrencyAggregateType<T extends CurrencyAggregateArgs> = {
        [P in keyof T & keyof AggregateCurrency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurrency[P]>
      : GetScalarType<T[P], AggregateCurrency[P]>
  }




  export type CurrencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurrencyWhereInput
    orderBy?: CurrencyOrderByWithAggregationInput | CurrencyOrderByWithAggregationInput[]
    by: CurrencyScalarFieldEnum[] | CurrencyScalarFieldEnum
    having?: CurrencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CurrencyCountAggregateInputType | true
    _min?: CurrencyMinAggregateInputType
    _max?: CurrencyMaxAggregateInputType
  }

  export type CurrencyGroupByOutputType = {
    id: string
    name: string
    symbol: string
    _count: CurrencyCountAggregateOutputType | null
    _min: CurrencyMinAggregateOutputType | null
    _max: CurrencyMaxAggregateOutputType | null
  }

  type GetCurrencyGroupByPayload<T extends CurrencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CurrencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CurrencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CurrencyGroupByOutputType[P]>
            : GetScalarType<T[P], CurrencyGroupByOutputType[P]>
        }
      >
    >


  export type CurrencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
    companies?: boolean | Currency$companiesArgs<ExtArgs>
    expenses?: boolean | Currency$expensesArgs<ExtArgs>
    exchangeRatesFrom?: boolean | Currency$exchangeRatesFromArgs<ExtArgs>
    _count?: boolean | CurrencyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currency"]>

  export type CurrencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
  }, ExtArgs["result"]["currency"]>

  export type CurrencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
  }, ExtArgs["result"]["currency"]>

  export type CurrencySelectScalar = {
    id?: boolean
    name?: boolean
    symbol?: boolean
  }

  export type CurrencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "symbol", ExtArgs["result"]["currency"]>
  export type CurrencyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | Currency$companiesArgs<ExtArgs>
    expenses?: boolean | Currency$expensesArgs<ExtArgs>
    exchangeRatesFrom?: boolean | Currency$exchangeRatesFromArgs<ExtArgs>
    _count?: boolean | CurrencyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CurrencyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CurrencyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CurrencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Currency"
    objects: {
      companies: Prisma.$CompanyPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      exchangeRatesFrom: Prisma.$ExchangeRateCachePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      symbol: string
    }, ExtArgs["result"]["currency"]>
    composites: {}
  }

  type CurrencyGetPayload<S extends boolean | null | undefined | CurrencyDefaultArgs> = $Result.GetResult<Prisma.$CurrencyPayload, S>

  type CurrencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CurrencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CurrencyCountAggregateInputType | true
    }

  export interface CurrencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Currency'], meta: { name: 'Currency' } }
    /**
     * Find zero or one Currency that matches the filter.
     * @param {CurrencyFindUniqueArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CurrencyFindUniqueArgs>(args: SelectSubset<T, CurrencyFindUniqueArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Currency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CurrencyFindUniqueOrThrowArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CurrencyFindUniqueOrThrowArgs>(args: SelectSubset<T, CurrencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Currency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyFindFirstArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CurrencyFindFirstArgs>(args?: SelectSubset<T, CurrencyFindFirstArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Currency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyFindFirstOrThrowArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CurrencyFindFirstOrThrowArgs>(args?: SelectSubset<T, CurrencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Currencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Currencies
     * const currencies = await prisma.currency.findMany()
     * 
     * // Get first 10 Currencies
     * const currencies = await prisma.currency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const currencyWithIdOnly = await prisma.currency.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CurrencyFindManyArgs>(args?: SelectSubset<T, CurrencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Currency.
     * @param {CurrencyCreateArgs} args - Arguments to create a Currency.
     * @example
     * // Create one Currency
     * const Currency = await prisma.currency.create({
     *   data: {
     *     // ... data to create a Currency
     *   }
     * })
     * 
     */
    create<T extends CurrencyCreateArgs>(args: SelectSubset<T, CurrencyCreateArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Currencies.
     * @param {CurrencyCreateManyArgs} args - Arguments to create many Currencies.
     * @example
     * // Create many Currencies
     * const currency = await prisma.currency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CurrencyCreateManyArgs>(args?: SelectSubset<T, CurrencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Currencies and returns the data saved in the database.
     * @param {CurrencyCreateManyAndReturnArgs} args - Arguments to create many Currencies.
     * @example
     * // Create many Currencies
     * const currency = await prisma.currency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Currencies and only return the `id`
     * const currencyWithIdOnly = await prisma.currency.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CurrencyCreateManyAndReturnArgs>(args?: SelectSubset<T, CurrencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Currency.
     * @param {CurrencyDeleteArgs} args - Arguments to delete one Currency.
     * @example
     * // Delete one Currency
     * const Currency = await prisma.currency.delete({
     *   where: {
     *     // ... filter to delete one Currency
     *   }
     * })
     * 
     */
    delete<T extends CurrencyDeleteArgs>(args: SelectSubset<T, CurrencyDeleteArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Currency.
     * @param {CurrencyUpdateArgs} args - Arguments to update one Currency.
     * @example
     * // Update one Currency
     * const currency = await prisma.currency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CurrencyUpdateArgs>(args: SelectSubset<T, CurrencyUpdateArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Currencies.
     * @param {CurrencyDeleteManyArgs} args - Arguments to filter Currencies to delete.
     * @example
     * // Delete a few Currencies
     * const { count } = await prisma.currency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CurrencyDeleteManyArgs>(args?: SelectSubset<T, CurrencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Currencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Currencies
     * const currency = await prisma.currency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CurrencyUpdateManyArgs>(args: SelectSubset<T, CurrencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Currencies and returns the data updated in the database.
     * @param {CurrencyUpdateManyAndReturnArgs} args - Arguments to update many Currencies.
     * @example
     * // Update many Currencies
     * const currency = await prisma.currency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Currencies and only return the `id`
     * const currencyWithIdOnly = await prisma.currency.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CurrencyUpdateManyAndReturnArgs>(args: SelectSubset<T, CurrencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Currency.
     * @param {CurrencyUpsertArgs} args - Arguments to update or create a Currency.
     * @example
     * // Update or create a Currency
     * const currency = await prisma.currency.upsert({
     *   create: {
     *     // ... data to create a Currency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Currency we want to update
     *   }
     * })
     */
    upsert<T extends CurrencyUpsertArgs>(args: SelectSubset<T, CurrencyUpsertArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Currencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyCountArgs} args - Arguments to filter Currencies to count.
     * @example
     * // Count the number of Currencies
     * const count = await prisma.currency.count({
     *   where: {
     *     // ... the filter for the Currencies we want to count
     *   }
     * })
    **/
    count<T extends CurrencyCountArgs>(
      args?: Subset<T, CurrencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurrencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Currency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurrencyAggregateArgs>(args: Subset<T, CurrencyAggregateArgs>): Prisma.PrismaPromise<GetCurrencyAggregateType<T>>

    /**
     * Group by Currency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurrencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurrencyGroupByArgs['orderBy'] }
        : { orderBy?: CurrencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurrencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurrencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Currency model
   */
  readonly fields: CurrencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Currency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CurrencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends Currency$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Currency$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends Currency$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Currency$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exchangeRatesFrom<T extends Currency$exchangeRatesFromArgs<ExtArgs> = {}>(args?: Subset<T, Currency$exchangeRatesFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Currency model
   */
  interface CurrencyFieldRefs {
    readonly id: FieldRef<"Currency", 'String'>
    readonly name: FieldRef<"Currency", 'String'>
    readonly symbol: FieldRef<"Currency", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Currency findUnique
   */
  export type CurrencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter, which Currency to fetch.
     */
    where: CurrencyWhereUniqueInput
  }

  /**
   * Currency findUniqueOrThrow
   */
  export type CurrencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter, which Currency to fetch.
     */
    where: CurrencyWhereUniqueInput
  }

  /**
   * Currency findFirst
   */
  export type CurrencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter, which Currency to fetch.
     */
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
     */
    orderBy?: CurrencyOrderByWithRelationInput | CurrencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Currencies.
     */
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Currencies.
     */
    distinct?: CurrencyScalarFieldEnum | CurrencyScalarFieldEnum[]
  }

  /**
   * Currency findFirstOrThrow
   */
  export type CurrencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter, which Currency to fetch.
     */
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
     */
    orderBy?: CurrencyOrderByWithRelationInput | CurrencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Currencies.
     */
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Currencies.
     */
    distinct?: CurrencyScalarFieldEnum | CurrencyScalarFieldEnum[]
  }

  /**
   * Currency findMany
   */
  export type CurrencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter, which Currencies to fetch.
     */
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
     */
    orderBy?: CurrencyOrderByWithRelationInput | CurrencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Currencies.
     */
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Currencies.
     */
    distinct?: CurrencyScalarFieldEnum | CurrencyScalarFieldEnum[]
  }

  /**
   * Currency create
   */
  export type CurrencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * The data needed to create a Currency.
     */
    data: XOR<CurrencyCreateInput, CurrencyUncheckedCreateInput>
  }

  /**
   * Currency createMany
   */
  export type CurrencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Currencies.
     */
    data: CurrencyCreateManyInput | CurrencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Currency createManyAndReturn
   */
  export type CurrencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * The data used to create many Currencies.
     */
    data: CurrencyCreateManyInput | CurrencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Currency update
   */
  export type CurrencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * The data needed to update a Currency.
     */
    data: XOR<CurrencyUpdateInput, CurrencyUncheckedUpdateInput>
    /**
     * Choose, which Currency to update.
     */
    where: CurrencyWhereUniqueInput
  }

  /**
   * Currency updateMany
   */
  export type CurrencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Currencies.
     */
    data: XOR<CurrencyUpdateManyMutationInput, CurrencyUncheckedUpdateManyInput>
    /**
     * Filter which Currencies to update
     */
    where?: CurrencyWhereInput
    /**
     * Limit how many Currencies to update.
     */
    limit?: number
  }

  /**
   * Currency updateManyAndReturn
   */
  export type CurrencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * The data used to update Currencies.
     */
    data: XOR<CurrencyUpdateManyMutationInput, CurrencyUncheckedUpdateManyInput>
    /**
     * Filter which Currencies to update
     */
    where?: CurrencyWhereInput
    /**
     * Limit how many Currencies to update.
     */
    limit?: number
  }

  /**
   * Currency upsert
   */
  export type CurrencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * The filter to search for the Currency to update in case it exists.
     */
    where: CurrencyWhereUniqueInput
    /**
     * In case the Currency found by the `where` argument doesn't exist, create a new Currency with this data.
     */
    create: XOR<CurrencyCreateInput, CurrencyUncheckedCreateInput>
    /**
     * In case the Currency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CurrencyUpdateInput, CurrencyUncheckedUpdateInput>
  }

  /**
   * Currency delete
   */
  export type CurrencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
    /**
     * Filter which Currency to delete.
     */
    where: CurrencyWhereUniqueInput
  }

  /**
   * Currency deleteMany
   */
  export type CurrencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Currencies to delete
     */
    where?: CurrencyWhereInput
    /**
     * Limit how many Currencies to delete.
     */
    limit?: number
  }

  /**
   * Currency.companies
   */
  export type Currency$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Currency.expenses
   */
  export type Currency$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Currency.exchangeRatesFrom
   */
  export type Currency$exchangeRatesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    where?: ExchangeRateCacheWhereInput
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    cursor?: ExchangeRateCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * Currency without action
   */
  export type CurrencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Currency
     */
    select?: CurrencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Currency
     */
    omit?: CurrencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrencyInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeRateCache
   */

  export type AggregateExchangeRateCache = {
    _count: ExchangeRateCacheCountAggregateOutputType | null
    _avg: ExchangeRateCacheAvgAggregateOutputType | null
    _sum: ExchangeRateCacheSumAggregateOutputType | null
    _min: ExchangeRateCacheMinAggregateOutputType | null
    _max: ExchangeRateCacheMaxAggregateOutputType | null
  }

  export type ExchangeRateCacheAvgAggregateOutputType = {
    rate: Decimal | null
  }

  export type ExchangeRateCacheSumAggregateOutputType = {
    rate: Decimal | null
  }

  export type ExchangeRateCacheMinAggregateOutputType = {
    id: string | null
    fromCurrencyId: string | null
    toCurrencyId: string | null
    rate: Decimal | null
    fetchedAt: Date | null
  }

  export type ExchangeRateCacheMaxAggregateOutputType = {
    id: string | null
    fromCurrencyId: string | null
    toCurrencyId: string | null
    rate: Decimal | null
    fetchedAt: Date | null
  }

  export type ExchangeRateCacheCountAggregateOutputType = {
    id: number
    fromCurrencyId: number
    toCurrencyId: number
    rate: number
    fetchedAt: number
    _all: number
  }


  export type ExchangeRateCacheAvgAggregateInputType = {
    rate?: true
  }

  export type ExchangeRateCacheSumAggregateInputType = {
    rate?: true
  }

  export type ExchangeRateCacheMinAggregateInputType = {
    id?: true
    fromCurrencyId?: true
    toCurrencyId?: true
    rate?: true
    fetchedAt?: true
  }

  export type ExchangeRateCacheMaxAggregateInputType = {
    id?: true
    fromCurrencyId?: true
    toCurrencyId?: true
    rate?: true
    fetchedAt?: true
  }

  export type ExchangeRateCacheCountAggregateInputType = {
    id?: true
    fromCurrencyId?: true
    toCurrencyId?: true
    rate?: true
    fetchedAt?: true
    _all?: true
  }

  export type ExchangeRateCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeRateCache to aggregate.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeRateCaches
    **/
    _count?: true | ExchangeRateCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeRateCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeRateCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeRateCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeRateCacheMaxAggregateInputType
  }

  export type GetExchangeRateCacheAggregateType<T extends ExchangeRateCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeRateCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeRateCache[P]>
      : GetScalarType<T[P], AggregateExchangeRateCache[P]>
  }




  export type ExchangeRateCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeRateCacheWhereInput
    orderBy?: ExchangeRateCacheOrderByWithAggregationInput | ExchangeRateCacheOrderByWithAggregationInput[]
    by: ExchangeRateCacheScalarFieldEnum[] | ExchangeRateCacheScalarFieldEnum
    having?: ExchangeRateCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeRateCacheCountAggregateInputType | true
    _avg?: ExchangeRateCacheAvgAggregateInputType
    _sum?: ExchangeRateCacheSumAggregateInputType
    _min?: ExchangeRateCacheMinAggregateInputType
    _max?: ExchangeRateCacheMaxAggregateInputType
  }

  export type ExchangeRateCacheGroupByOutputType = {
    id: string
    fromCurrencyId: string
    toCurrencyId: string
    rate: Decimal
    fetchedAt: Date
    _count: ExchangeRateCacheCountAggregateOutputType | null
    _avg: ExchangeRateCacheAvgAggregateOutputType | null
    _sum: ExchangeRateCacheSumAggregateOutputType | null
    _min: ExchangeRateCacheMinAggregateOutputType | null
    _max: ExchangeRateCacheMaxAggregateOutputType | null
  }

  type GetExchangeRateCacheGroupByPayload<T extends ExchangeRateCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeRateCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeRateCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeRateCacheGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeRateCacheGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeRateCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromCurrencyId?: boolean
    toCurrencyId?: boolean
    rate?: boolean
    fetchedAt?: boolean
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromCurrencyId?: boolean
    toCurrencyId?: boolean
    rate?: boolean
    fetchedAt?: boolean
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromCurrencyId?: boolean
    toCurrencyId?: boolean
    rate?: boolean
    fetchedAt?: boolean
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectScalar = {
    id?: boolean
    fromCurrencyId?: boolean
    toCurrencyId?: boolean
    rate?: boolean
    fetchedAt?: boolean
  }

  export type ExchangeRateCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromCurrencyId" | "toCurrencyId" | "rate" | "fetchedAt", ExtArgs["result"]["exchangeRateCache"]>
  export type ExchangeRateCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }
  export type ExchangeRateCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }
  export type ExchangeRateCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }

  export type $ExchangeRateCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeRateCache"
    objects: {
      fromCurrency: Prisma.$CurrencyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromCurrencyId: string
      toCurrencyId: string
      rate: Prisma.Decimal
      fetchedAt: Date
    }, ExtArgs["result"]["exchangeRateCache"]>
    composites: {}
  }

  type ExchangeRateCacheGetPayload<S extends boolean | null | undefined | ExchangeRateCacheDefaultArgs> = $Result.GetResult<Prisma.$ExchangeRateCachePayload, S>

  type ExchangeRateCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExchangeRateCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExchangeRateCacheCountAggregateInputType | true
    }

  export interface ExchangeRateCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeRateCache'], meta: { name: 'ExchangeRateCache' } }
    /**
     * Find zero or one ExchangeRateCache that matches the filter.
     * @param {ExchangeRateCacheFindUniqueArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeRateCacheFindUniqueArgs>(args: SelectSubset<T, ExchangeRateCacheFindUniqueArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExchangeRateCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExchangeRateCacheFindUniqueOrThrowArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeRateCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeRateCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindFirstArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeRateCacheFindFirstArgs>(args?: SelectSubset<T, ExchangeRateCacheFindFirstArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeRateCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindFirstOrThrowArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeRateCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExchangeRateCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeRateCaches
     * const exchangeRateCaches = await prisma.exchangeRateCache.findMany()
     * 
     * // Get first 10 ExchangeRateCaches
     * const exchangeRateCaches = await prisma.exchangeRateCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeRateCacheFindManyArgs>(args?: SelectSubset<T, ExchangeRateCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExchangeRateCache.
     * @param {ExchangeRateCacheCreateArgs} args - Arguments to create a ExchangeRateCache.
     * @example
     * // Create one ExchangeRateCache
     * const ExchangeRateCache = await prisma.exchangeRateCache.create({
     *   data: {
     *     // ... data to create a ExchangeRateCache
     *   }
     * })
     * 
     */
    create<T extends ExchangeRateCacheCreateArgs>(args: SelectSubset<T, ExchangeRateCacheCreateArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExchangeRateCaches.
     * @param {ExchangeRateCacheCreateManyArgs} args - Arguments to create many ExchangeRateCaches.
     * @example
     * // Create many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeRateCacheCreateManyArgs>(args?: SelectSubset<T, ExchangeRateCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeRateCaches and returns the data saved in the database.
     * @param {ExchangeRateCacheCreateManyAndReturnArgs} args - Arguments to create many ExchangeRateCaches.
     * @example
     * // Create many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeRateCaches and only return the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeRateCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExchangeRateCache.
     * @param {ExchangeRateCacheDeleteArgs} args - Arguments to delete one ExchangeRateCache.
     * @example
     * // Delete one ExchangeRateCache
     * const ExchangeRateCache = await prisma.exchangeRateCache.delete({
     *   where: {
     *     // ... filter to delete one ExchangeRateCache
     *   }
     * })
     * 
     */
    delete<T extends ExchangeRateCacheDeleteArgs>(args: SelectSubset<T, ExchangeRateCacheDeleteArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExchangeRateCache.
     * @param {ExchangeRateCacheUpdateArgs} args - Arguments to update one ExchangeRateCache.
     * @example
     * // Update one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeRateCacheUpdateArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExchangeRateCaches.
     * @param {ExchangeRateCacheDeleteManyArgs} args - Arguments to filter ExchangeRateCaches to delete.
     * @example
     * // Delete a few ExchangeRateCaches
     * const { count } = await prisma.exchangeRateCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeRateCacheDeleteManyArgs>(args?: SelectSubset<T, ExchangeRateCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeRateCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeRateCacheUpdateManyArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeRateCaches and returns the data updated in the database.
     * @param {ExchangeRateCacheUpdateManyAndReturnArgs} args - Arguments to update many ExchangeRateCaches.
     * @example
     * // Update many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExchangeRateCaches and only return the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExchangeRateCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExchangeRateCache.
     * @param {ExchangeRateCacheUpsertArgs} args - Arguments to update or create a ExchangeRateCache.
     * @example
     * // Update or create a ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.upsert({
     *   create: {
     *     // ... data to create a ExchangeRateCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeRateCache we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeRateCacheUpsertArgs>(args: SelectSubset<T, ExchangeRateCacheUpsertArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExchangeRateCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheCountArgs} args - Arguments to filter ExchangeRateCaches to count.
     * @example
     * // Count the number of ExchangeRateCaches
     * const count = await prisma.exchangeRateCache.count({
     *   where: {
     *     // ... the filter for the ExchangeRateCaches we want to count
     *   }
     * })
    **/
    count<T extends ExchangeRateCacheCountArgs>(
      args?: Subset<T, ExchangeRateCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeRateCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeRateCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeRateCacheAggregateArgs>(args: Subset<T, ExchangeRateCacheAggregateArgs>): Prisma.PrismaPromise<GetExchangeRateCacheAggregateType<T>>

    /**
     * Group by ExchangeRateCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeRateCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeRateCacheGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeRateCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeRateCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeRateCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeRateCache model
   */
  readonly fields: ExchangeRateCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeRateCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeRateCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromCurrency<T extends CurrencyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CurrencyDefaultArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeRateCache model
   */
  interface ExchangeRateCacheFieldRefs {
    readonly id: FieldRef<"ExchangeRateCache", 'String'>
    readonly fromCurrencyId: FieldRef<"ExchangeRateCache", 'String'>
    readonly toCurrencyId: FieldRef<"ExchangeRateCache", 'String'>
    readonly rate: FieldRef<"ExchangeRateCache", 'Decimal'>
    readonly fetchedAt: FieldRef<"ExchangeRateCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeRateCache findUnique
   */
  export type ExchangeRateCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache findUniqueOrThrow
   */
  export type ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache findFirst
   */
  export type ExchangeRateCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache findFirstOrThrow
   */
  export type ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache findMany
   */
  export type ExchangeRateCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCaches to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache create
   */
  export type ExchangeRateCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangeRateCache.
     */
    data: XOR<ExchangeRateCacheCreateInput, ExchangeRateCacheUncheckedCreateInput>
  }

  /**
   * ExchangeRateCache createMany
   */
  export type ExchangeRateCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeRateCaches.
     */
    data: ExchangeRateCacheCreateManyInput | ExchangeRateCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeRateCache createManyAndReturn
   */
  export type ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data used to create many ExchangeRateCaches.
     */
    data: ExchangeRateCacheCreateManyInput | ExchangeRateCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeRateCache update
   */
  export type ExchangeRateCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangeRateCache.
     */
    data: XOR<ExchangeRateCacheUpdateInput, ExchangeRateCacheUncheckedUpdateInput>
    /**
     * Choose, which ExchangeRateCache to update.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache updateMany
   */
  export type ExchangeRateCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeRateCaches.
     */
    data: XOR<ExchangeRateCacheUpdateManyMutationInput, ExchangeRateCacheUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeRateCaches to update
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to update.
     */
    limit?: number
  }

  /**
   * ExchangeRateCache updateManyAndReturn
   */
  export type ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data used to update ExchangeRateCaches.
     */
    data: XOR<ExchangeRateCacheUpdateManyMutationInput, ExchangeRateCacheUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeRateCaches to update
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeRateCache upsert
   */
  export type ExchangeRateCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangeRateCache to update in case it exists.
     */
    where: ExchangeRateCacheWhereUniqueInput
    /**
     * In case the ExchangeRateCache found by the `where` argument doesn't exist, create a new ExchangeRateCache with this data.
     */
    create: XOR<ExchangeRateCacheCreateInput, ExchangeRateCacheUncheckedCreateInput>
    /**
     * In case the ExchangeRateCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeRateCacheUpdateInput, ExchangeRateCacheUncheckedUpdateInput>
  }

  /**
   * ExchangeRateCache delete
   */
  export type ExchangeRateCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
    /**
     * Filter which ExchangeRateCache to delete.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache deleteMany
   */
  export type ExchangeRateCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeRateCaches to delete
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to delete.
     */
    limit?: number
  }

  /**
   * ExchangeRateCache without action
   */
  export type ExchangeRateCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeRateCacheInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    baseCurrencyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    baseCurrencyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    country: number
    baseCurrencyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    country?: true
    baseCurrencyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    country?: true
    baseCurrencyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    country?: true
    baseCurrencyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    baseCurrencyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
    users?: boolean | Company$usersArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    approvalRules?: boolean | Company$approvalRulesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    baseCurrencyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    baseCurrencyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    country?: boolean
    baseCurrencyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "country" | "baseCurrencyId" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
    users?: boolean | Company$usersArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    approvalRules?: boolean | Company$approvalRulesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baseCurrency?: boolean | CurrencyDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      baseCurrency: Prisma.$CurrencyPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>[]
      categories: Prisma.$ExpenseCategoryPayload<ExtArgs>[]
      approvalRules: Prisma.$ApprovalRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      country: string
      baseCurrencyId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baseCurrency<T extends CurrencyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CurrencyDefaultArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Company$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Company$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvalRules<T extends Company$approvalRulesArgs<ExtArgs> = {}>(args?: Subset<T, Company$approvalRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly country: FieldRef<"Company", 'String'>
    readonly baseCurrencyId: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.categories
   */
  export type Company$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    cursor?: ExpenseCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * Company.approvalRules
   */
  export type Company$approvalRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    where?: ApprovalRuleWhereInput
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    cursor?: ApprovalRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalRuleScalarFieldEnum | ApprovalRuleScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    designation: string | null
    companyId: string | null
    managerId: string | null
    isActive: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    designation: string | null
    companyId: string | null
    managerId: string | null
    isActive: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    designation: number
    companyId: number
    managerId: number
    isActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    designation?: true
    companyId?: true
    managerId?: true
    isActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    designation?: true
    companyId?: true
    managerId?: true
    isActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    designation?: true
    companyId?: true
    managerId?: true
    isActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role
    designation: string | null
    companyId: string | null
    managerId: string | null
    isActive: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    designation?: boolean
    companyId?: boolean
    managerId?: boolean
    isActive?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
    subordinates?: boolean | User$subordinatesArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    approvalActions?: boolean | User$approvalActionsArgs<ExtArgs>
    approvalSteps?: boolean | User$approvalStepsArgs<ExtArgs>
    specificApproverFor?: boolean | User$specificApproverForArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    designation?: boolean
    companyId?: boolean
    managerId?: boolean
    isActive?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    designation?: boolean
    companyId?: boolean
    managerId?: boolean
    isActive?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    designation?: boolean
    companyId?: boolean
    managerId?: boolean
    isActive?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "designation" | "companyId" | "managerId" | "isActive", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
    subordinates?: boolean | User$subordinatesArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    approvalActions?: boolean | User$approvalActionsArgs<ExtArgs>
    approvalSteps?: boolean | User$approvalStepsArgs<ExtArgs>
    specificApproverFor?: boolean | User$specificApproverForArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
      manager: Prisma.$UserPayload<ExtArgs> | null
      subordinates: Prisma.$UserPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      approvalActions: Prisma.$ApprovalActionPayload<ExtArgs>[]
      approvalSteps: Prisma.$ApprovalStepPayload<ExtArgs>[]
      specificApproverFor: Prisma.$ApprovalRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
      role: $Enums.Role
      designation: string | null
      companyId: string | null
      managerId: string | null
      isActive: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    manager<T extends User$managerArgs<ExtArgs> = {}>(args?: Subset<T, User$managerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subordinates<T extends User$subordinatesArgs<ExtArgs> = {}>(args?: Subset<T, User$subordinatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends User$expensesArgs<ExtArgs> = {}>(args?: Subset<T, User$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvalActions<T extends User$approvalActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$approvalActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvalSteps<T extends User$approvalStepsArgs<ExtArgs> = {}>(args?: Subset<T, User$approvalStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specificApproverFor<T extends User$specificApproverForArgs<ExtArgs> = {}>(args?: Subset<T, User$specificApproverForArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly designation: FieldRef<"User", 'String'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly managerId: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User.manager
   */
  export type User$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.subordinates
   */
  export type User$subordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.expenses
   */
  export type User$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User.approvalActions
   */
  export type User$approvalActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    where?: ApprovalActionWhereInput
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    cursor?: ApprovalActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * User.approvalSteps
   */
  export type User$approvalStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    where?: ApprovalStepWhereInput
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    cursor?: ApprovalStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalStepScalarFieldEnum | ApprovalStepScalarFieldEnum[]
  }

  /**
   * User.specificApproverFor
   */
  export type User$specificApproverForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    where?: ApprovalRuleWhereInput
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    cursor?: ApprovalRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalRuleScalarFieldEnum | ApprovalRuleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseCategory
   */

  export type AggregateExpenseCategory = {
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  export type ExpenseCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    companyId: string | null
    isActive: boolean | null
  }

  export type ExpenseCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    companyId: string | null
    isActive: boolean | null
  }

  export type ExpenseCategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    companyId: number
    isActive: number
    _all: number
  }


  export type ExpenseCategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    companyId?: true
    isActive?: true
  }

  export type ExpenseCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    companyId?: true
    isActive?: true
  }

  export type ExpenseCategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    companyId?: true
    isActive?: true
    _all?: true
  }

  export type ExpenseCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategory to aggregate.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseCategories
    **/
    _count?: true | ExpenseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type GetExpenseCategoryAggregateType<T extends ExpenseCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseCategory[P]>
      : GetScalarType<T[P], AggregateExpenseCategory[P]>
  }




  export type ExpenseCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithAggregationInput | ExpenseCategoryOrderByWithAggregationInput[]
    by: ExpenseCategoryScalarFieldEnum[] | ExpenseCategoryScalarFieldEnum
    having?: ExpenseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCategoryCountAggregateInputType | true
    _min?: ExpenseCategoryMinAggregateInputType
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type ExpenseCategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    companyId: string
    isActive: boolean
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type GetExpenseCategoryGroupByPayload<T extends ExpenseCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    companyId?: boolean
    isActive?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    expenses?: boolean | ExpenseCategory$expensesArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    companyId?: boolean
    isActive?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    companyId?: boolean
    isActive?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    companyId?: boolean
    isActive?: boolean
  }

  export type ExpenseCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "companyId" | "isActive", ExtArgs["result"]["expenseCategory"]>
  export type ExpenseCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    expenses?: boolean | ExpenseCategory$expensesArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ExpenseCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ExpenseCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseCategory"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      companyId: string
      isActive: boolean
    }, ExtArgs["result"]["expenseCategory"]>
    composites: {}
  }

  type ExpenseCategoryGetPayload<S extends boolean | null | undefined | ExpenseCategoryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseCategoryPayload, S>

  type ExpenseCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCategoryCountAggregateInputType | true
    }

  export interface ExpenseCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseCategory'], meta: { name: 'ExpenseCategory' } }
    /**
     * Find zero or one ExpenseCategory that matches the filter.
     * @param {ExpenseCategoryFindUniqueArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseCategoryFindUniqueArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseCategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseCategoryFindFirstArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany()
     * 
     * // Get first 10 ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseCategoryFindManyArgs>(args?: SelectSubset<T, ExpenseCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseCategory.
     * @param {ExpenseCategoryCreateArgs} args - Arguments to create a ExpenseCategory.
     * @example
     * // Create one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.create({
     *   data: {
     *     // ... data to create a ExpenseCategory
     *   }
     * })
     * 
     */
    create<T extends ExpenseCategoryCreateArgs>(args: SelectSubset<T, ExpenseCategoryCreateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseCategories.
     * @param {ExpenseCategoryCreateManyArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCategoryCreateManyArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseCategories and returns the data saved in the database.
     * @param {ExpenseCategoryCreateManyAndReturnArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseCategory.
     * @param {ExpenseCategoryDeleteArgs} args - Arguments to delete one ExpenseCategory.
     * @example
     * // Delete one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseCategory
     *   }
     * })
     * 
     */
    delete<T extends ExpenseCategoryDeleteArgs>(args: SelectSubset<T, ExpenseCategoryDeleteArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseCategory.
     * @param {ExpenseCategoryUpdateArgs} args - Arguments to update one ExpenseCategory.
     * @example
     * // Update one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseCategoryUpdateArgs>(args: SelectSubset<T, ExpenseCategoryUpdateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseCategories.
     * @param {ExpenseCategoryDeleteManyArgs} args - Arguments to filter ExpenseCategories to delete.
     * @example
     * // Delete a few ExpenseCategories
     * const { count } = await prisma.expenseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseCategoryDeleteManyArgs>(args?: SelectSubset<T, ExpenseCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseCategoryUpdateManyArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories and returns the data updated in the database.
     * @param {ExpenseCategoryUpdateManyAndReturnArgs} args - Arguments to update many ExpenseCategories.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseCategory.
     * @param {ExpenseCategoryUpsertArgs} args - Arguments to update or create a ExpenseCategory.
     * @example
     * // Update or create a ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseCategory we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseCategoryUpsertArgs>(args: SelectSubset<T, ExpenseCategoryUpsertArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryCountArgs} args - Arguments to filter ExpenseCategories to count.
     * @example
     * // Count the number of ExpenseCategories
     * const count = await prisma.expenseCategory.count({
     *   where: {
     *     // ... the filter for the ExpenseCategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCategoryCountArgs>(
      args?: Subset<T, ExpenseCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseCategoryAggregateArgs>(args: Subset<T, ExpenseCategoryAggregateArgs>): Prisma.PrismaPromise<GetExpenseCategoryAggregateType<T>>

    /**
     * Group by ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseCategory model
   */
  readonly fields: ExpenseCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    expenses<T extends ExpenseCategory$expensesArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseCategory model
   */
  interface ExpenseCategoryFieldRefs {
    readonly id: FieldRef<"ExpenseCategory", 'String'>
    readonly name: FieldRef<"ExpenseCategory", 'String'>
    readonly description: FieldRef<"ExpenseCategory", 'String'>
    readonly companyId: FieldRef<"ExpenseCategory", 'String'>
    readonly isActive: FieldRef<"ExpenseCategory", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseCategory findUnique
   */
  export type ExpenseCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findUniqueOrThrow
   */
  export type ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findFirst
   */
  export type ExpenseCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findFirstOrThrow
   */
  export type ExpenseCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findMany
   */
  export type ExpenseCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategories to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory create
   */
  export type ExpenseCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
  }

  /**
   * ExpenseCategory createMany
   */
  export type ExpenseCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseCategory createManyAndReturn
   */
  export type ExpenseCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseCategory update
   */
  export type ExpenseCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseCategory to update.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory updateMany
   */
  export type ExpenseCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
  }

  /**
   * ExpenseCategory updateManyAndReturn
   */
  export type ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseCategory upsert
   */
  export type ExpenseCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseCategory to update in case it exists.
     */
    where: ExpenseCategoryWhereUniqueInput
    /**
     * In case the ExpenseCategory found by the `where` argument doesn't exist, create a new ExpenseCategory with this data.
     */
    create: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
    /**
     * In case the ExpenseCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
  }

  /**
   * ExpenseCategory delete
   */
  export type ExpenseCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter which ExpenseCategory to delete.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory deleteMany
   */
  export type ExpenseCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategories to delete
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to delete.
     */
    limit?: number
  }

  /**
   * ExpenseCategory.expenses
   */
  export type ExpenseCategory$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * ExpenseCategory without action
   */
  export type ExpenseCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    totalAmount: Decimal | null
    convertedAmount: Decimal | null
    exchangeRate: Decimal | null
    currentStepOrder: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    totalAmount: Decimal | null
    convertedAmount: Decimal | null
    exchangeRate: Decimal | null
    currentStepOrder: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    subject: string | null
    description: string | null
    expenseDate: Date | null
    totalAmount: Decimal | null
    currencyId: string | null
    convertedAmount: Decimal | null
    exchangeRate: Decimal | null
    status: $Enums.ExpenseStatus | null
    remarks: string | null
    receiptUrl: string | null
    categoryId: string | null
    submitterId: string | null
    approvalRuleId: string | null
    currentStepOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    submittedAt: Date | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    subject: string | null
    description: string | null
    expenseDate: Date | null
    totalAmount: Decimal | null
    currencyId: string | null
    convertedAmount: Decimal | null
    exchangeRate: Decimal | null
    status: $Enums.ExpenseStatus | null
    remarks: string | null
    receiptUrl: string | null
    categoryId: string | null
    submitterId: string | null
    approvalRuleId: string | null
    currentStepOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    submittedAt: Date | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    subject: number
    description: number
    expenseDate: number
    totalAmount: number
    currencyId: number
    convertedAmount: number
    exchangeRate: number
    status: number
    remarks: number
    receiptUrl: number
    categoryId: number
    submitterId: number
    approvalRuleId: number
    currentStepOrder: number
    createdAt: number
    updatedAt: number
    submittedAt: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    totalAmount?: true
    convertedAmount?: true
    exchangeRate?: true
    currentStepOrder?: true
  }

  export type ExpenseSumAggregateInputType = {
    totalAmount?: true
    convertedAmount?: true
    exchangeRate?: true
    currentStepOrder?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    expenseDate?: true
    totalAmount?: true
    currencyId?: true
    convertedAmount?: true
    exchangeRate?: true
    status?: true
    remarks?: true
    receiptUrl?: true
    categoryId?: true
    submitterId?: true
    approvalRuleId?: true
    currentStepOrder?: true
    createdAt?: true
    updatedAt?: true
    submittedAt?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    expenseDate?: true
    totalAmount?: true
    currencyId?: true
    convertedAmount?: true
    exchangeRate?: true
    status?: true
    remarks?: true
    receiptUrl?: true
    categoryId?: true
    submitterId?: true
    approvalRuleId?: true
    currentStepOrder?: true
    createdAt?: true
    updatedAt?: true
    submittedAt?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    expenseDate?: true
    totalAmount?: true
    currencyId?: true
    convertedAmount?: true
    exchangeRate?: true
    status?: true
    remarks?: true
    receiptUrl?: true
    categoryId?: true
    submitterId?: true
    approvalRuleId?: true
    currentStepOrder?: true
    createdAt?: true
    updatedAt?: true
    submittedAt?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    subject: string
    description: string | null
    expenseDate: Date
    totalAmount: Decimal
    currencyId: string
    convertedAmount: Decimal | null
    exchangeRate: Decimal | null
    status: $Enums.ExpenseStatus
    remarks: string | null
    receiptUrl: string | null
    categoryId: string
    submitterId: string
    approvalRuleId: string | null
    currentStepOrder: number | null
    createdAt: Date
    updatedAt: Date
    submittedAt: Date | null
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    expenseDate?: boolean
    totalAmount?: boolean
    currencyId?: boolean
    convertedAmount?: boolean
    exchangeRate?: boolean
    status?: boolean
    remarks?: boolean
    receiptUrl?: boolean
    categoryId?: boolean
    submitterId?: boolean
    approvalRuleId?: boolean
    currentStepOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedAt?: boolean
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
    approvalActions?: boolean | Expense$approvalActionsArgs<ExtArgs>
    _count?: boolean | ExpenseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    expenseDate?: boolean
    totalAmount?: boolean
    currencyId?: boolean
    convertedAmount?: boolean
    exchangeRate?: boolean
    status?: boolean
    remarks?: boolean
    receiptUrl?: boolean
    categoryId?: boolean
    submitterId?: boolean
    approvalRuleId?: boolean
    currentStepOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedAt?: boolean
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    expenseDate?: boolean
    totalAmount?: boolean
    currencyId?: boolean
    convertedAmount?: boolean
    exchangeRate?: boolean
    status?: boolean
    remarks?: boolean
    receiptUrl?: boolean
    categoryId?: boolean
    submitterId?: boolean
    approvalRuleId?: boolean
    currentStepOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedAt?: boolean
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    subject?: boolean
    description?: boolean
    expenseDate?: boolean
    totalAmount?: boolean
    currencyId?: boolean
    convertedAmount?: boolean
    exchangeRate?: boolean
    status?: boolean
    remarks?: boolean
    receiptUrl?: boolean
    categoryId?: boolean
    submitterId?: boolean
    approvalRuleId?: boolean
    currentStepOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedAt?: boolean
  }

  export type ExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subject" | "description" | "expenseDate" | "totalAmount" | "currencyId" | "convertedAmount" | "exchangeRate" | "status" | "remarks" | "receiptUrl" | "categoryId" | "submitterId" | "approvalRuleId" | "currentStepOrder" | "createdAt" | "updatedAt" | "submittedAt", ExtArgs["result"]["expense"]>
  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
    approvalActions?: boolean | Expense$approvalActionsArgs<ExtArgs>
    _count?: boolean | ExpenseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
  }
  export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    submitter?: boolean | UserDefaultArgs<ExtArgs>
    currency?: boolean | CurrencyDefaultArgs<ExtArgs>
    approvalRule?: boolean | Expense$approvalRuleArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      category: Prisma.$ExpenseCategoryPayload<ExtArgs>
      submitter: Prisma.$UserPayload<ExtArgs>
      currency: Prisma.$CurrencyPayload<ExtArgs>
      approvalRule: Prisma.$ApprovalRulePayload<ExtArgs> | null
      approvalActions: Prisma.$ApprovalActionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subject: string
      description: string | null
      expenseDate: Date
      totalAmount: Prisma.Decimal
      currencyId: string
      convertedAmount: Prisma.Decimal | null
      exchangeRate: Prisma.Decimal | null
      status: $Enums.ExpenseStatus
      remarks: string | null
      receiptUrl: string | null
      categoryId: string
      submitterId: string
      approvalRuleId: string | null
      currentStepOrder: number | null
      createdAt: Date
      updatedAt: Date
      submittedAt: Date | null
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends ExpenseCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submitter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    currency<T extends CurrencyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CurrencyDefaultArgs<ExtArgs>>): Prisma__CurrencyClient<$Result.GetResult<Prisma.$CurrencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvalRule<T extends Expense$approvalRuleArgs<ExtArgs> = {}>(args?: Subset<T, Expense$approvalRuleArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    approvalActions<T extends Expense$approvalActionsArgs<ExtArgs> = {}>(args?: Subset<T, Expense$approvalActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly subject: FieldRef<"Expense", 'String'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly expenseDate: FieldRef<"Expense", 'DateTime'>
    readonly totalAmount: FieldRef<"Expense", 'Decimal'>
    readonly currencyId: FieldRef<"Expense", 'String'>
    readonly convertedAmount: FieldRef<"Expense", 'Decimal'>
    readonly exchangeRate: FieldRef<"Expense", 'Decimal'>
    readonly status: FieldRef<"Expense", 'ExpenseStatus'>
    readonly remarks: FieldRef<"Expense", 'String'>
    readonly receiptUrl: FieldRef<"Expense", 'String'>
    readonly categoryId: FieldRef<"Expense", 'String'>
    readonly submitterId: FieldRef<"Expense", 'String'>
    readonly approvalRuleId: FieldRef<"Expense", 'String'>
    readonly currentStepOrder: FieldRef<"Expense", 'Int'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly updatedAt: FieldRef<"Expense", 'DateTime'>
    readonly submittedAt: FieldRef<"Expense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense updateManyAndReturn
   */
  export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expense.approvalRule
   */
  export type Expense$approvalRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    where?: ApprovalRuleWhereInput
  }

  /**
   * Expense.approvalActions
   */
  export type Expense$approvalActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    where?: ApprovalActionWhereInput
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    cursor?: ApprovalActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model ApprovalRule
   */

  export type AggregateApprovalRule = {
    _count: ApprovalRuleCountAggregateOutputType | null
    _avg: ApprovalRuleAvgAggregateOutputType | null
    _sum: ApprovalRuleSumAggregateOutputType | null
    _min: ApprovalRuleMinAggregateOutputType | null
    _max: ApprovalRuleMaxAggregateOutputType | null
  }

  export type ApprovalRuleAvgAggregateOutputType = {
    requiredPercent: number | null
  }

  export type ApprovalRuleSumAggregateOutputType = {
    requiredPercent: number | null
  }

  export type ApprovalRuleMinAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    ruleType: $Enums.ApprovalRuleType | null
    requiredPercent: number | null
    specificApproverId: string | null
    isManagerFirst: boolean | null
    isDefault: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApprovalRuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    ruleType: $Enums.ApprovalRuleType | null
    requiredPercent: number | null
    specificApproverId: string | null
    isManagerFirst: boolean | null
    isDefault: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApprovalRuleCountAggregateOutputType = {
    id: number
    name: number
    companyId: number
    ruleType: number
    requiredPercent: number
    specificApproverId: number
    isManagerFirst: number
    isDefault: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApprovalRuleAvgAggregateInputType = {
    requiredPercent?: true
  }

  export type ApprovalRuleSumAggregateInputType = {
    requiredPercent?: true
  }

  export type ApprovalRuleMinAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    ruleType?: true
    requiredPercent?: true
    specificApproverId?: true
    isManagerFirst?: true
    isDefault?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApprovalRuleMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    ruleType?: true
    requiredPercent?: true
    specificApproverId?: true
    isManagerFirst?: true
    isDefault?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApprovalRuleCountAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    ruleType?: true
    requiredPercent?: true
    specificApproverId?: true
    isManagerFirst?: true
    isDefault?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApprovalRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRule to aggregate.
     */
    where?: ApprovalRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRules to fetch.
     */
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalRules
    **/
    _count?: true | ApprovalRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApprovalRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApprovalRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalRuleMaxAggregateInputType
  }

  export type GetApprovalRuleAggregateType<T extends ApprovalRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalRule[P]>
      : GetScalarType<T[P], AggregateApprovalRule[P]>
  }




  export type ApprovalRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRuleWhereInput
    orderBy?: ApprovalRuleOrderByWithAggregationInput | ApprovalRuleOrderByWithAggregationInput[]
    by: ApprovalRuleScalarFieldEnum[] | ApprovalRuleScalarFieldEnum
    having?: ApprovalRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalRuleCountAggregateInputType | true
    _avg?: ApprovalRuleAvgAggregateInputType
    _sum?: ApprovalRuleSumAggregateInputType
    _min?: ApprovalRuleMinAggregateInputType
    _max?: ApprovalRuleMaxAggregateInputType
  }

  export type ApprovalRuleGroupByOutputType = {
    id: string
    name: string
    companyId: string
    ruleType: $Enums.ApprovalRuleType
    requiredPercent: number | null
    specificApproverId: string | null
    isManagerFirst: boolean
    isDefault: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ApprovalRuleCountAggregateOutputType | null
    _avg: ApprovalRuleAvgAggregateOutputType | null
    _sum: ApprovalRuleSumAggregateOutputType | null
    _min: ApprovalRuleMinAggregateOutputType | null
    _max: ApprovalRuleMaxAggregateOutputType | null
  }

  type GetApprovalRuleGroupByPayload<T extends ApprovalRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalRuleGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalRuleGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    ruleType?: boolean
    requiredPercent?: boolean
    specificApproverId?: boolean
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
    steps?: boolean | ApprovalRule$stepsArgs<ExtArgs>
    expenses?: boolean | ApprovalRule$expensesArgs<ExtArgs>
    _count?: boolean | ApprovalRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRule"]>

  export type ApprovalRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    ruleType?: boolean
    requiredPercent?: boolean
    specificApproverId?: boolean
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRule"]>

  export type ApprovalRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    ruleType?: boolean
    requiredPercent?: boolean
    specificApproverId?: boolean
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRule"]>

  export type ApprovalRuleSelectScalar = {
    id?: boolean
    name?: boolean
    companyId?: boolean
    ruleType?: boolean
    requiredPercent?: boolean
    specificApproverId?: boolean
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApprovalRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "companyId" | "ruleType" | "requiredPercent" | "specificApproverId" | "isManagerFirst" | "isDefault" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["approvalRule"]>
  export type ApprovalRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
    steps?: boolean | ApprovalRule$stepsArgs<ExtArgs>
    expenses?: boolean | ApprovalRule$expensesArgs<ExtArgs>
    _count?: boolean | ApprovalRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ApprovalRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
  }
  export type ApprovalRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    specificApprover?: boolean | ApprovalRule$specificApproverArgs<ExtArgs>
  }

  export type $ApprovalRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalRule"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      specificApprover: Prisma.$UserPayload<ExtArgs> | null
      steps: Prisma.$ApprovalStepPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      companyId: string
      ruleType: $Enums.ApprovalRuleType
      requiredPercent: number | null
      specificApproverId: string | null
      isManagerFirst: boolean
      isDefault: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["approvalRule"]>
    composites: {}
  }

  type ApprovalRuleGetPayload<S extends boolean | null | undefined | ApprovalRuleDefaultArgs> = $Result.GetResult<Prisma.$ApprovalRulePayload, S>

  type ApprovalRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalRuleCountAggregateInputType | true
    }

  export interface ApprovalRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalRule'], meta: { name: 'ApprovalRule' } }
    /**
     * Find zero or one ApprovalRule that matches the filter.
     * @param {ApprovalRuleFindUniqueArgs} args - Arguments to find a ApprovalRule
     * @example
     * // Get one ApprovalRule
     * const approvalRule = await prisma.approvalRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalRuleFindUniqueArgs>(args: SelectSubset<T, ApprovalRuleFindUniqueArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalRuleFindUniqueOrThrowArgs} args - Arguments to find a ApprovalRule
     * @example
     * // Get one ApprovalRule
     * const approvalRule = await prisma.approvalRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleFindFirstArgs} args - Arguments to find a ApprovalRule
     * @example
     * // Get one ApprovalRule
     * const approvalRule = await prisma.approvalRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalRuleFindFirstArgs>(args?: SelectSubset<T, ApprovalRuleFindFirstArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleFindFirstOrThrowArgs} args - Arguments to find a ApprovalRule
     * @example
     * // Get one ApprovalRule
     * const approvalRule = await prisma.approvalRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalRules
     * const approvalRules = await prisma.approvalRule.findMany()
     * 
     * // Get first 10 ApprovalRules
     * const approvalRules = await prisma.approvalRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalRuleWithIdOnly = await prisma.approvalRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalRuleFindManyArgs>(args?: SelectSubset<T, ApprovalRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalRule.
     * @param {ApprovalRuleCreateArgs} args - Arguments to create a ApprovalRule.
     * @example
     * // Create one ApprovalRule
     * const ApprovalRule = await prisma.approvalRule.create({
     *   data: {
     *     // ... data to create a ApprovalRule
     *   }
     * })
     * 
     */
    create<T extends ApprovalRuleCreateArgs>(args: SelectSubset<T, ApprovalRuleCreateArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalRules.
     * @param {ApprovalRuleCreateManyArgs} args - Arguments to create many ApprovalRules.
     * @example
     * // Create many ApprovalRules
     * const approvalRule = await prisma.approvalRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalRuleCreateManyArgs>(args?: SelectSubset<T, ApprovalRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalRules and returns the data saved in the database.
     * @param {ApprovalRuleCreateManyAndReturnArgs} args - Arguments to create many ApprovalRules.
     * @example
     * // Create many ApprovalRules
     * const approvalRule = await prisma.approvalRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalRules and only return the `id`
     * const approvalRuleWithIdOnly = await prisma.approvalRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalRule.
     * @param {ApprovalRuleDeleteArgs} args - Arguments to delete one ApprovalRule.
     * @example
     * // Delete one ApprovalRule
     * const ApprovalRule = await prisma.approvalRule.delete({
     *   where: {
     *     // ... filter to delete one ApprovalRule
     *   }
     * })
     * 
     */
    delete<T extends ApprovalRuleDeleteArgs>(args: SelectSubset<T, ApprovalRuleDeleteArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalRule.
     * @param {ApprovalRuleUpdateArgs} args - Arguments to update one ApprovalRule.
     * @example
     * // Update one ApprovalRule
     * const approvalRule = await prisma.approvalRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalRuleUpdateArgs>(args: SelectSubset<T, ApprovalRuleUpdateArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalRules.
     * @param {ApprovalRuleDeleteManyArgs} args - Arguments to filter ApprovalRules to delete.
     * @example
     * // Delete a few ApprovalRules
     * const { count } = await prisma.approvalRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalRuleDeleteManyArgs>(args?: SelectSubset<T, ApprovalRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalRules
     * const approvalRule = await prisma.approvalRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalRuleUpdateManyArgs>(args: SelectSubset<T, ApprovalRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRules and returns the data updated in the database.
     * @param {ApprovalRuleUpdateManyAndReturnArgs} args - Arguments to update many ApprovalRules.
     * @example
     * // Update many ApprovalRules
     * const approvalRule = await prisma.approvalRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalRules and only return the `id`
     * const approvalRuleWithIdOnly = await prisma.approvalRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApprovalRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalRule.
     * @param {ApprovalRuleUpsertArgs} args - Arguments to update or create a ApprovalRule.
     * @example
     * // Update or create a ApprovalRule
     * const approvalRule = await prisma.approvalRule.upsert({
     *   create: {
     *     // ... data to create a ApprovalRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalRule we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalRuleUpsertArgs>(args: SelectSubset<T, ApprovalRuleUpsertArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleCountArgs} args - Arguments to filter ApprovalRules to count.
     * @example
     * // Count the number of ApprovalRules
     * const count = await prisma.approvalRule.count({
     *   where: {
     *     // ... the filter for the ApprovalRules we want to count
     *   }
     * })
    **/
    count<T extends ApprovalRuleCountArgs>(
      args?: Subset<T, ApprovalRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApprovalRuleAggregateArgs>(args: Subset<T, ApprovalRuleAggregateArgs>): Prisma.PrismaPromise<GetApprovalRuleAggregateType<T>>

    /**
     * Group by ApprovalRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApprovalRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalRuleGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApprovalRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalRule model
   */
  readonly fields: ApprovalRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    specificApprover<T extends ApprovalRule$specificApproverArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRule$specificApproverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    steps<T extends ApprovalRule$stepsArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRule$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends ApprovalRule$expensesArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRule$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApprovalRule model
   */
  interface ApprovalRuleFieldRefs {
    readonly id: FieldRef<"ApprovalRule", 'String'>
    readonly name: FieldRef<"ApprovalRule", 'String'>
    readonly companyId: FieldRef<"ApprovalRule", 'String'>
    readonly ruleType: FieldRef<"ApprovalRule", 'ApprovalRuleType'>
    readonly requiredPercent: FieldRef<"ApprovalRule", 'Int'>
    readonly specificApproverId: FieldRef<"ApprovalRule", 'String'>
    readonly isManagerFirst: FieldRef<"ApprovalRule", 'Boolean'>
    readonly isDefault: FieldRef<"ApprovalRule", 'Boolean'>
    readonly isActive: FieldRef<"ApprovalRule", 'Boolean'>
    readonly createdAt: FieldRef<"ApprovalRule", 'DateTime'>
    readonly updatedAt: FieldRef<"ApprovalRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalRule findUnique
   */
  export type ApprovalRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRule to fetch.
     */
    where: ApprovalRuleWhereUniqueInput
  }

  /**
   * ApprovalRule findUniqueOrThrow
   */
  export type ApprovalRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRule to fetch.
     */
    where: ApprovalRuleWhereUniqueInput
  }

  /**
   * ApprovalRule findFirst
   */
  export type ApprovalRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRule to fetch.
     */
    where?: ApprovalRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRules to fetch.
     */
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRules.
     */
    cursor?: ApprovalRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRules.
     */
    distinct?: ApprovalRuleScalarFieldEnum | ApprovalRuleScalarFieldEnum[]
  }

  /**
   * ApprovalRule findFirstOrThrow
   */
  export type ApprovalRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRule to fetch.
     */
    where?: ApprovalRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRules to fetch.
     */
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRules.
     */
    cursor?: ApprovalRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRules.
     */
    distinct?: ApprovalRuleScalarFieldEnum | ApprovalRuleScalarFieldEnum[]
  }

  /**
   * ApprovalRule findMany
   */
  export type ApprovalRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRules to fetch.
     */
    where?: ApprovalRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRules to fetch.
     */
    orderBy?: ApprovalRuleOrderByWithRelationInput | ApprovalRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalRules.
     */
    cursor?: ApprovalRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRules.
     */
    distinct?: ApprovalRuleScalarFieldEnum | ApprovalRuleScalarFieldEnum[]
  }

  /**
   * ApprovalRule create
   */
  export type ApprovalRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a ApprovalRule.
     */
    data: XOR<ApprovalRuleCreateInput, ApprovalRuleUncheckedCreateInput>
  }

  /**
   * ApprovalRule createMany
   */
  export type ApprovalRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalRules.
     */
    data: ApprovalRuleCreateManyInput | ApprovalRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalRule createManyAndReturn
   */
  export type ApprovalRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalRules.
     */
    data: ApprovalRuleCreateManyInput | ApprovalRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRule update
   */
  export type ApprovalRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a ApprovalRule.
     */
    data: XOR<ApprovalRuleUpdateInput, ApprovalRuleUncheckedUpdateInput>
    /**
     * Choose, which ApprovalRule to update.
     */
    where: ApprovalRuleWhereUniqueInput
  }

  /**
   * ApprovalRule updateMany
   */
  export type ApprovalRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalRules.
     */
    data: XOR<ApprovalRuleUpdateManyMutationInput, ApprovalRuleUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRules to update
     */
    where?: ApprovalRuleWhereInput
    /**
     * Limit how many ApprovalRules to update.
     */
    limit?: number
  }

  /**
   * ApprovalRule updateManyAndReturn
   */
  export type ApprovalRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalRules.
     */
    data: XOR<ApprovalRuleUpdateManyMutationInput, ApprovalRuleUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRules to update
     */
    where?: ApprovalRuleWhereInput
    /**
     * Limit how many ApprovalRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRule upsert
   */
  export type ApprovalRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the ApprovalRule to update in case it exists.
     */
    where: ApprovalRuleWhereUniqueInput
    /**
     * In case the ApprovalRule found by the `where` argument doesn't exist, create a new ApprovalRule with this data.
     */
    create: XOR<ApprovalRuleCreateInput, ApprovalRuleUncheckedCreateInput>
    /**
     * In case the ApprovalRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalRuleUpdateInput, ApprovalRuleUncheckedUpdateInput>
  }

  /**
   * ApprovalRule delete
   */
  export type ApprovalRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
    /**
     * Filter which ApprovalRule to delete.
     */
    where: ApprovalRuleWhereUniqueInput
  }

  /**
   * ApprovalRule deleteMany
   */
  export type ApprovalRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRules to delete
     */
    where?: ApprovalRuleWhereInput
    /**
     * Limit how many ApprovalRules to delete.
     */
    limit?: number
  }

  /**
   * ApprovalRule.specificApprover
   */
  export type ApprovalRule$specificApproverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ApprovalRule.steps
   */
  export type ApprovalRule$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    where?: ApprovalStepWhereInput
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    cursor?: ApprovalStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalStepScalarFieldEnum | ApprovalStepScalarFieldEnum[]
  }

  /**
   * ApprovalRule.expenses
   */
  export type ApprovalRule$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * ApprovalRule without action
   */
  export type ApprovalRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRule
     */
    select?: ApprovalRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRule
     */
    omit?: ApprovalRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRuleInclude<ExtArgs> | null
  }


  /**
   * Model ApprovalStep
   */

  export type AggregateApprovalStep = {
    _count: ApprovalStepCountAggregateOutputType | null
    _avg: ApprovalStepAvgAggregateOutputType | null
    _sum: ApprovalStepSumAggregateOutputType | null
    _min: ApprovalStepMinAggregateOutputType | null
    _max: ApprovalStepMaxAggregateOutputType | null
  }

  export type ApprovalStepAvgAggregateOutputType = {
    stepOrder: number | null
  }

  export type ApprovalStepSumAggregateOutputType = {
    stepOrder: number | null
  }

  export type ApprovalStepMinAggregateOutputType = {
    id: string | null
    approvalRuleId: string | null
    approverId: string | null
    stepOrder: number | null
  }

  export type ApprovalStepMaxAggregateOutputType = {
    id: string | null
    approvalRuleId: string | null
    approverId: string | null
    stepOrder: number | null
  }

  export type ApprovalStepCountAggregateOutputType = {
    id: number
    approvalRuleId: number
    approverId: number
    stepOrder: number
    _all: number
  }


  export type ApprovalStepAvgAggregateInputType = {
    stepOrder?: true
  }

  export type ApprovalStepSumAggregateInputType = {
    stepOrder?: true
  }

  export type ApprovalStepMinAggregateInputType = {
    id?: true
    approvalRuleId?: true
    approverId?: true
    stepOrder?: true
  }

  export type ApprovalStepMaxAggregateInputType = {
    id?: true
    approvalRuleId?: true
    approverId?: true
    stepOrder?: true
  }

  export type ApprovalStepCountAggregateInputType = {
    id?: true
    approvalRuleId?: true
    approverId?: true
    stepOrder?: true
    _all?: true
  }

  export type ApprovalStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalStep to aggregate.
     */
    where?: ApprovalStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalSteps to fetch.
     */
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalSteps
    **/
    _count?: true | ApprovalStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApprovalStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApprovalStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalStepMaxAggregateInputType
  }

  export type GetApprovalStepAggregateType<T extends ApprovalStepAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalStep[P]>
      : GetScalarType<T[P], AggregateApprovalStep[P]>
  }




  export type ApprovalStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalStepWhereInput
    orderBy?: ApprovalStepOrderByWithAggregationInput | ApprovalStepOrderByWithAggregationInput[]
    by: ApprovalStepScalarFieldEnum[] | ApprovalStepScalarFieldEnum
    having?: ApprovalStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalStepCountAggregateInputType | true
    _avg?: ApprovalStepAvgAggregateInputType
    _sum?: ApprovalStepSumAggregateInputType
    _min?: ApprovalStepMinAggregateInputType
    _max?: ApprovalStepMaxAggregateInputType
  }

  export type ApprovalStepGroupByOutputType = {
    id: string
    approvalRuleId: string
    approverId: string
    stepOrder: number
    _count: ApprovalStepCountAggregateOutputType | null
    _avg: ApprovalStepAvgAggregateOutputType | null
    _sum: ApprovalStepSumAggregateOutputType | null
    _min: ApprovalStepMinAggregateOutputType | null
    _max: ApprovalStepMaxAggregateOutputType | null
  }

  type GetApprovalStepGroupByPayload<T extends ApprovalStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalStepGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalStepGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approvalRuleId?: boolean
    approverId?: boolean
    stepOrder?: boolean
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalStep"]>

  export type ApprovalStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approvalRuleId?: boolean
    approverId?: boolean
    stepOrder?: boolean
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalStep"]>

  export type ApprovalStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approvalRuleId?: boolean
    approverId?: boolean
    stepOrder?: boolean
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalStep"]>

  export type ApprovalStepSelectScalar = {
    id?: boolean
    approvalRuleId?: boolean
    approverId?: boolean
    stepOrder?: boolean
  }

  export type ApprovalStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "approvalRuleId" | "approverId" | "stepOrder", ExtArgs["result"]["approvalStep"]>
  export type ApprovalStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApprovalStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApprovalStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvalRule?: boolean | ApprovalRuleDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApprovalStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalStep"
    objects: {
      approvalRule: Prisma.$ApprovalRulePayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approvalRuleId: string
      approverId: string
      stepOrder: number
    }, ExtArgs["result"]["approvalStep"]>
    composites: {}
  }

  type ApprovalStepGetPayload<S extends boolean | null | undefined | ApprovalStepDefaultArgs> = $Result.GetResult<Prisma.$ApprovalStepPayload, S>

  type ApprovalStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalStepCountAggregateInputType | true
    }

  export interface ApprovalStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalStep'], meta: { name: 'ApprovalStep' } }
    /**
     * Find zero or one ApprovalStep that matches the filter.
     * @param {ApprovalStepFindUniqueArgs} args - Arguments to find a ApprovalStep
     * @example
     * // Get one ApprovalStep
     * const approvalStep = await prisma.approvalStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalStepFindUniqueArgs>(args: SelectSubset<T, ApprovalStepFindUniqueArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalStepFindUniqueOrThrowArgs} args - Arguments to find a ApprovalStep
     * @example
     * // Get one ApprovalStep
     * const approvalStep = await prisma.approvalStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalStepFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepFindFirstArgs} args - Arguments to find a ApprovalStep
     * @example
     * // Get one ApprovalStep
     * const approvalStep = await prisma.approvalStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalStepFindFirstArgs>(args?: SelectSubset<T, ApprovalStepFindFirstArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepFindFirstOrThrowArgs} args - Arguments to find a ApprovalStep
     * @example
     * // Get one ApprovalStep
     * const approvalStep = await prisma.approvalStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalStepFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalSteps
     * const approvalSteps = await prisma.approvalStep.findMany()
     * 
     * // Get first 10 ApprovalSteps
     * const approvalSteps = await prisma.approvalStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalStepWithIdOnly = await prisma.approvalStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalStepFindManyArgs>(args?: SelectSubset<T, ApprovalStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalStep.
     * @param {ApprovalStepCreateArgs} args - Arguments to create a ApprovalStep.
     * @example
     * // Create one ApprovalStep
     * const ApprovalStep = await prisma.approvalStep.create({
     *   data: {
     *     // ... data to create a ApprovalStep
     *   }
     * })
     * 
     */
    create<T extends ApprovalStepCreateArgs>(args: SelectSubset<T, ApprovalStepCreateArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalSteps.
     * @param {ApprovalStepCreateManyArgs} args - Arguments to create many ApprovalSteps.
     * @example
     * // Create many ApprovalSteps
     * const approvalStep = await prisma.approvalStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalStepCreateManyArgs>(args?: SelectSubset<T, ApprovalStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalSteps and returns the data saved in the database.
     * @param {ApprovalStepCreateManyAndReturnArgs} args - Arguments to create many ApprovalSteps.
     * @example
     * // Create many ApprovalSteps
     * const approvalStep = await prisma.approvalStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalSteps and only return the `id`
     * const approvalStepWithIdOnly = await prisma.approvalStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalStepCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalStep.
     * @param {ApprovalStepDeleteArgs} args - Arguments to delete one ApprovalStep.
     * @example
     * // Delete one ApprovalStep
     * const ApprovalStep = await prisma.approvalStep.delete({
     *   where: {
     *     // ... filter to delete one ApprovalStep
     *   }
     * })
     * 
     */
    delete<T extends ApprovalStepDeleteArgs>(args: SelectSubset<T, ApprovalStepDeleteArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalStep.
     * @param {ApprovalStepUpdateArgs} args - Arguments to update one ApprovalStep.
     * @example
     * // Update one ApprovalStep
     * const approvalStep = await prisma.approvalStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalStepUpdateArgs>(args: SelectSubset<T, ApprovalStepUpdateArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalSteps.
     * @param {ApprovalStepDeleteManyArgs} args - Arguments to filter ApprovalSteps to delete.
     * @example
     * // Delete a few ApprovalSteps
     * const { count } = await prisma.approvalStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalStepDeleteManyArgs>(args?: SelectSubset<T, ApprovalStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalSteps
     * const approvalStep = await prisma.approvalStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalStepUpdateManyArgs>(args: SelectSubset<T, ApprovalStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalSteps and returns the data updated in the database.
     * @param {ApprovalStepUpdateManyAndReturnArgs} args - Arguments to update many ApprovalSteps.
     * @example
     * // Update many ApprovalSteps
     * const approvalStep = await prisma.approvalStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalSteps and only return the `id`
     * const approvalStepWithIdOnly = await prisma.approvalStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApprovalStepUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalStep.
     * @param {ApprovalStepUpsertArgs} args - Arguments to update or create a ApprovalStep.
     * @example
     * // Update or create a ApprovalStep
     * const approvalStep = await prisma.approvalStep.upsert({
     *   create: {
     *     // ... data to create a ApprovalStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalStep we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalStepUpsertArgs>(args: SelectSubset<T, ApprovalStepUpsertArgs<ExtArgs>>): Prisma__ApprovalStepClient<$Result.GetResult<Prisma.$ApprovalStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepCountArgs} args - Arguments to filter ApprovalSteps to count.
     * @example
     * // Count the number of ApprovalSteps
     * const count = await prisma.approvalStep.count({
     *   where: {
     *     // ... the filter for the ApprovalSteps we want to count
     *   }
     * })
    **/
    count<T extends ApprovalStepCountArgs>(
      args?: Subset<T, ApprovalStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApprovalStepAggregateArgs>(args: Subset<T, ApprovalStepAggregateArgs>): Prisma.PrismaPromise<GetApprovalStepAggregateType<T>>

    /**
     * Group by ApprovalStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApprovalStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalStepGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApprovalStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalStep model
   */
  readonly fields: ApprovalStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    approvalRule<T extends ApprovalRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRuleDefaultArgs<ExtArgs>>): Prisma__ApprovalRuleClient<$Result.GetResult<Prisma.$ApprovalRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApprovalStep model
   */
  interface ApprovalStepFieldRefs {
    readonly id: FieldRef<"ApprovalStep", 'String'>
    readonly approvalRuleId: FieldRef<"ApprovalStep", 'String'>
    readonly approverId: FieldRef<"ApprovalStep", 'String'>
    readonly stepOrder: FieldRef<"ApprovalStep", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalStep findUnique
   */
  export type ApprovalStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalStep to fetch.
     */
    where: ApprovalStepWhereUniqueInput
  }

  /**
   * ApprovalStep findUniqueOrThrow
   */
  export type ApprovalStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalStep to fetch.
     */
    where: ApprovalStepWhereUniqueInput
  }

  /**
   * ApprovalStep findFirst
   */
  export type ApprovalStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalStep to fetch.
     */
    where?: ApprovalStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalSteps to fetch.
     */
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalSteps.
     */
    cursor?: ApprovalStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalSteps.
     */
    distinct?: ApprovalStepScalarFieldEnum | ApprovalStepScalarFieldEnum[]
  }

  /**
   * ApprovalStep findFirstOrThrow
   */
  export type ApprovalStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalStep to fetch.
     */
    where?: ApprovalStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalSteps to fetch.
     */
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalSteps.
     */
    cursor?: ApprovalStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalSteps.
     */
    distinct?: ApprovalStepScalarFieldEnum | ApprovalStepScalarFieldEnum[]
  }

  /**
   * ApprovalStep findMany
   */
  export type ApprovalStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalSteps to fetch.
     */
    where?: ApprovalStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalSteps to fetch.
     */
    orderBy?: ApprovalStepOrderByWithRelationInput | ApprovalStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalSteps.
     */
    cursor?: ApprovalStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalSteps.
     */
    distinct?: ApprovalStepScalarFieldEnum | ApprovalStepScalarFieldEnum[]
  }

  /**
   * ApprovalStep create
   */
  export type ApprovalStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * The data needed to create a ApprovalStep.
     */
    data: XOR<ApprovalStepCreateInput, ApprovalStepUncheckedCreateInput>
  }

  /**
   * ApprovalStep createMany
   */
  export type ApprovalStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalSteps.
     */
    data: ApprovalStepCreateManyInput | ApprovalStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalStep createManyAndReturn
   */
  export type ApprovalStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalSteps.
     */
    data: ApprovalStepCreateManyInput | ApprovalStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalStep update
   */
  export type ApprovalStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * The data needed to update a ApprovalStep.
     */
    data: XOR<ApprovalStepUpdateInput, ApprovalStepUncheckedUpdateInput>
    /**
     * Choose, which ApprovalStep to update.
     */
    where: ApprovalStepWhereUniqueInput
  }

  /**
   * ApprovalStep updateMany
   */
  export type ApprovalStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalSteps.
     */
    data: XOR<ApprovalStepUpdateManyMutationInput, ApprovalStepUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalSteps to update
     */
    where?: ApprovalStepWhereInput
    /**
     * Limit how many ApprovalSteps to update.
     */
    limit?: number
  }

  /**
   * ApprovalStep updateManyAndReturn
   */
  export type ApprovalStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalSteps.
     */
    data: XOR<ApprovalStepUpdateManyMutationInput, ApprovalStepUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalSteps to update
     */
    where?: ApprovalStepWhereInput
    /**
     * Limit how many ApprovalSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalStep upsert
   */
  export type ApprovalStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * The filter to search for the ApprovalStep to update in case it exists.
     */
    where: ApprovalStepWhereUniqueInput
    /**
     * In case the ApprovalStep found by the `where` argument doesn't exist, create a new ApprovalStep with this data.
     */
    create: XOR<ApprovalStepCreateInput, ApprovalStepUncheckedCreateInput>
    /**
     * In case the ApprovalStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalStepUpdateInput, ApprovalStepUncheckedUpdateInput>
  }

  /**
   * ApprovalStep delete
   */
  export type ApprovalStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
    /**
     * Filter which ApprovalStep to delete.
     */
    where: ApprovalStepWhereUniqueInput
  }

  /**
   * ApprovalStep deleteMany
   */
  export type ApprovalStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalSteps to delete
     */
    where?: ApprovalStepWhereInput
    /**
     * Limit how many ApprovalSteps to delete.
     */
    limit?: number
  }

  /**
   * ApprovalStep without action
   */
  export type ApprovalStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalStep
     */
    select?: ApprovalStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalStep
     */
    omit?: ApprovalStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalStepInclude<ExtArgs> | null
  }


  /**
   * Model ApprovalAction
   */

  export type AggregateApprovalAction = {
    _count: ApprovalActionCountAggregateOutputType | null
    _avg: ApprovalActionAvgAggregateOutputType | null
    _sum: ApprovalActionSumAggregateOutputType | null
    _min: ApprovalActionMinAggregateOutputType | null
    _max: ApprovalActionMaxAggregateOutputType | null
  }

  export type ApprovalActionAvgAggregateOutputType = {
    stepOrder: number | null
  }

  export type ApprovalActionSumAggregateOutputType = {
    stepOrder: number | null
  }

  export type ApprovalActionMinAggregateOutputType = {
    id: string | null
    expenseId: string | null
    approverId: string | null
    action: $Enums.ApprovalActionType | null
    comment: string | null
    stepOrder: number | null
    createdAt: Date | null
  }

  export type ApprovalActionMaxAggregateOutputType = {
    id: string | null
    expenseId: string | null
    approverId: string | null
    action: $Enums.ApprovalActionType | null
    comment: string | null
    stepOrder: number | null
    createdAt: Date | null
  }

  export type ApprovalActionCountAggregateOutputType = {
    id: number
    expenseId: number
    approverId: number
    action: number
    comment: number
    stepOrder: number
    createdAt: number
    _all: number
  }


  export type ApprovalActionAvgAggregateInputType = {
    stepOrder?: true
  }

  export type ApprovalActionSumAggregateInputType = {
    stepOrder?: true
  }

  export type ApprovalActionMinAggregateInputType = {
    id?: true
    expenseId?: true
    approverId?: true
    action?: true
    comment?: true
    stepOrder?: true
    createdAt?: true
  }

  export type ApprovalActionMaxAggregateInputType = {
    id?: true
    expenseId?: true
    approverId?: true
    action?: true
    comment?: true
    stepOrder?: true
    createdAt?: true
  }

  export type ApprovalActionCountAggregateInputType = {
    id?: true
    expenseId?: true
    approverId?: true
    action?: true
    comment?: true
    stepOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ApprovalActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalAction to aggregate.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalActions
    **/
    _count?: true | ApprovalActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApprovalActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApprovalActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalActionMaxAggregateInputType
  }

  export type GetApprovalActionAggregateType<T extends ApprovalActionAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalAction[P]>
      : GetScalarType<T[P], AggregateApprovalAction[P]>
  }




  export type ApprovalActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalActionWhereInput
    orderBy?: ApprovalActionOrderByWithAggregationInput | ApprovalActionOrderByWithAggregationInput[]
    by: ApprovalActionScalarFieldEnum[] | ApprovalActionScalarFieldEnum
    having?: ApprovalActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalActionCountAggregateInputType | true
    _avg?: ApprovalActionAvgAggregateInputType
    _sum?: ApprovalActionSumAggregateInputType
    _min?: ApprovalActionMinAggregateInputType
    _max?: ApprovalActionMaxAggregateInputType
  }

  export type ApprovalActionGroupByOutputType = {
    id: string
    expenseId: string
    approverId: string
    action: $Enums.ApprovalActionType
    comment: string | null
    stepOrder: number
    createdAt: Date
    _count: ApprovalActionCountAggregateOutputType | null
    _avg: ApprovalActionAvgAggregateOutputType | null
    _sum: ApprovalActionSumAggregateOutputType | null
    _min: ApprovalActionMinAggregateOutputType | null
    _max: ApprovalActionMaxAggregateOutputType | null
  }

  type GetApprovalActionGroupByPayload<T extends ApprovalActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalActionGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalActionGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseId?: boolean
    approverId?: boolean
    action?: boolean
    comment?: boolean
    stepOrder?: boolean
    createdAt?: boolean
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseId?: boolean
    approverId?: boolean
    action?: boolean
    comment?: boolean
    stepOrder?: boolean
    createdAt?: boolean
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseId?: boolean
    approverId?: boolean
    action?: boolean
    comment?: boolean
    stepOrder?: boolean
    createdAt?: boolean
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectScalar = {
    id?: boolean
    expenseId?: boolean
    approverId?: boolean
    action?: boolean
    comment?: boolean
    stepOrder?: boolean
    createdAt?: boolean
  }

  export type ApprovalActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expenseId" | "approverId" | "action" | "comment" | "stepOrder" | "createdAt", ExtArgs["result"]["approvalAction"]>
  export type ApprovalActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApprovalActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApprovalActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | ExpenseDefaultArgs<ExtArgs>
    approver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApprovalActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalAction"
    objects: {
      expense: Prisma.$ExpensePayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expenseId: string
      approverId: string
      action: $Enums.ApprovalActionType
      comment: string | null
      stepOrder: number
      createdAt: Date
    }, ExtArgs["result"]["approvalAction"]>
    composites: {}
  }

  type ApprovalActionGetPayload<S extends boolean | null | undefined | ApprovalActionDefaultArgs> = $Result.GetResult<Prisma.$ApprovalActionPayload, S>

  type ApprovalActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalActionCountAggregateInputType | true
    }

  export interface ApprovalActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalAction'], meta: { name: 'ApprovalAction' } }
    /**
     * Find zero or one ApprovalAction that matches the filter.
     * @param {ApprovalActionFindUniqueArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalActionFindUniqueArgs>(args: SelectSubset<T, ApprovalActionFindUniqueArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalActionFindUniqueOrThrowArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalActionFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindFirstArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalActionFindFirstArgs>(args?: SelectSubset<T, ApprovalActionFindFirstArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindFirstOrThrowArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalActionFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalActions
     * const approvalActions = await prisma.approvalAction.findMany()
     * 
     * // Get first 10 ApprovalActions
     * const approvalActions = await prisma.approvalAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalActionFindManyArgs>(args?: SelectSubset<T, ApprovalActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalAction.
     * @param {ApprovalActionCreateArgs} args - Arguments to create a ApprovalAction.
     * @example
     * // Create one ApprovalAction
     * const ApprovalAction = await prisma.approvalAction.create({
     *   data: {
     *     // ... data to create a ApprovalAction
     *   }
     * })
     * 
     */
    create<T extends ApprovalActionCreateArgs>(args: SelectSubset<T, ApprovalActionCreateArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalActions.
     * @param {ApprovalActionCreateManyArgs} args - Arguments to create many ApprovalActions.
     * @example
     * // Create many ApprovalActions
     * const approvalAction = await prisma.approvalAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalActionCreateManyArgs>(args?: SelectSubset<T, ApprovalActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalActions and returns the data saved in the database.
     * @param {ApprovalActionCreateManyAndReturnArgs} args - Arguments to create many ApprovalActions.
     * @example
     * // Create many ApprovalActions
     * const approvalAction = await prisma.approvalAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalActions and only return the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalActionCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalAction.
     * @param {ApprovalActionDeleteArgs} args - Arguments to delete one ApprovalAction.
     * @example
     * // Delete one ApprovalAction
     * const ApprovalAction = await prisma.approvalAction.delete({
     *   where: {
     *     // ... filter to delete one ApprovalAction
     *   }
     * })
     * 
     */
    delete<T extends ApprovalActionDeleteArgs>(args: SelectSubset<T, ApprovalActionDeleteArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalAction.
     * @param {ApprovalActionUpdateArgs} args - Arguments to update one ApprovalAction.
     * @example
     * // Update one ApprovalAction
     * const approvalAction = await prisma.approvalAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalActionUpdateArgs>(args: SelectSubset<T, ApprovalActionUpdateArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalActions.
     * @param {ApprovalActionDeleteManyArgs} args - Arguments to filter ApprovalActions to delete.
     * @example
     * // Delete a few ApprovalActions
     * const { count } = await prisma.approvalAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalActionDeleteManyArgs>(args?: SelectSubset<T, ApprovalActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalActions
     * const approvalAction = await prisma.approvalAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalActionUpdateManyArgs>(args: SelectSubset<T, ApprovalActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalActions and returns the data updated in the database.
     * @param {ApprovalActionUpdateManyAndReturnArgs} args - Arguments to update many ApprovalActions.
     * @example
     * // Update many ApprovalActions
     * const approvalAction = await prisma.approvalAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalActions and only return the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApprovalActionUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalAction.
     * @param {ApprovalActionUpsertArgs} args - Arguments to update or create a ApprovalAction.
     * @example
     * // Update or create a ApprovalAction
     * const approvalAction = await prisma.approvalAction.upsert({
     *   create: {
     *     // ... data to create a ApprovalAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalAction we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalActionUpsertArgs>(args: SelectSubset<T, ApprovalActionUpsertArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionCountArgs} args - Arguments to filter ApprovalActions to count.
     * @example
     * // Count the number of ApprovalActions
     * const count = await prisma.approvalAction.count({
     *   where: {
     *     // ... the filter for the ApprovalActions we want to count
     *   }
     * })
    **/
    count<T extends ApprovalActionCountArgs>(
      args?: Subset<T, ApprovalActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApprovalActionAggregateArgs>(args: Subset<T, ApprovalActionAggregateArgs>): Prisma.PrismaPromise<GetApprovalActionAggregateType<T>>

    /**
     * Group by ApprovalAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApprovalActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalActionGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApprovalActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalAction model
   */
  readonly fields: ApprovalActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expense<T extends ExpenseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseDefaultArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApprovalAction model
   */
  interface ApprovalActionFieldRefs {
    readonly id: FieldRef<"ApprovalAction", 'String'>
    readonly expenseId: FieldRef<"ApprovalAction", 'String'>
    readonly approverId: FieldRef<"ApprovalAction", 'String'>
    readonly action: FieldRef<"ApprovalAction", 'ApprovalActionType'>
    readonly comment: FieldRef<"ApprovalAction", 'String'>
    readonly stepOrder: FieldRef<"ApprovalAction", 'Int'>
    readonly createdAt: FieldRef<"ApprovalAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalAction findUnique
   */
  export type ApprovalActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction findUniqueOrThrow
   */
  export type ApprovalActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction findFirst
   */
  export type ApprovalActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalActions.
     */
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction findFirstOrThrow
   */
  export type ApprovalActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalActions.
     */
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction findMany
   */
  export type ApprovalActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalActions to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalActions.
     */
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction create
   */
  export type ApprovalActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * The data needed to create a ApprovalAction.
     */
    data: XOR<ApprovalActionCreateInput, ApprovalActionUncheckedCreateInput>
  }

  /**
   * ApprovalAction createMany
   */
  export type ApprovalActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalActions.
     */
    data: ApprovalActionCreateManyInput | ApprovalActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalAction createManyAndReturn
   */
  export type ApprovalActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalActions.
     */
    data: ApprovalActionCreateManyInput | ApprovalActionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalAction update
   */
  export type ApprovalActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * The data needed to update a ApprovalAction.
     */
    data: XOR<ApprovalActionUpdateInput, ApprovalActionUncheckedUpdateInput>
    /**
     * Choose, which ApprovalAction to update.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction updateMany
   */
  export type ApprovalActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalActions.
     */
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalActions to update
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to update.
     */
    limit?: number
  }

  /**
   * ApprovalAction updateManyAndReturn
   */
  export type ApprovalActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalActions.
     */
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalActions to update
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalAction upsert
   */
  export type ApprovalActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * The filter to search for the ApprovalAction to update in case it exists.
     */
    where: ApprovalActionWhereUniqueInput
    /**
     * In case the ApprovalAction found by the `where` argument doesn't exist, create a new ApprovalAction with this data.
     */
    create: XOR<ApprovalActionCreateInput, ApprovalActionUncheckedCreateInput>
    /**
     * In case the ApprovalAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalActionUpdateInput, ApprovalActionUncheckedUpdateInput>
  }

  /**
   * ApprovalAction delete
   */
  export type ApprovalActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
    /**
     * Filter which ApprovalAction to delete.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction deleteMany
   */
  export type ApprovalActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalActions to delete
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to delete.
     */
    limit?: number
  }

  /**
   * ApprovalAction without action
   */
  export type ApprovalActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalActionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CurrencyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    symbol: 'symbol'
  };

  export type CurrencyScalarFieldEnum = (typeof CurrencyScalarFieldEnum)[keyof typeof CurrencyScalarFieldEnum]


  export const ExchangeRateCacheScalarFieldEnum: {
    id: 'id',
    fromCurrencyId: 'fromCurrencyId',
    toCurrencyId: 'toCurrencyId',
    rate: 'rate',
    fetchedAt: 'fetchedAt'
  };

  export type ExchangeRateCacheScalarFieldEnum = (typeof ExchangeRateCacheScalarFieldEnum)[keyof typeof ExchangeRateCacheScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    country: 'country',
    baseCurrencyId: 'baseCurrencyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    designation: 'designation',
    companyId: 'companyId',
    managerId: 'managerId',
    isActive: 'isActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ExpenseCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    companyId: 'companyId',
    isActive: 'isActive'
  };

  export type ExpenseCategoryScalarFieldEnum = (typeof ExpenseCategoryScalarFieldEnum)[keyof typeof ExpenseCategoryScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    subject: 'subject',
    description: 'description',
    expenseDate: 'expenseDate',
    totalAmount: 'totalAmount',
    currencyId: 'currencyId',
    convertedAmount: 'convertedAmount',
    exchangeRate: 'exchangeRate',
    status: 'status',
    remarks: 'remarks',
    receiptUrl: 'receiptUrl',
    categoryId: 'categoryId',
    submitterId: 'submitterId',
    approvalRuleId: 'approvalRuleId',
    currentStepOrder: 'currentStepOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    submittedAt: 'submittedAt'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const ApprovalRuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    ruleType: 'ruleType',
    requiredPercent: 'requiredPercent',
    specificApproverId: 'specificApproverId',
    isManagerFirst: 'isManagerFirst',
    isDefault: 'isDefault',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApprovalRuleScalarFieldEnum = (typeof ApprovalRuleScalarFieldEnum)[keyof typeof ApprovalRuleScalarFieldEnum]


  export const ApprovalStepScalarFieldEnum: {
    id: 'id',
    approvalRuleId: 'approvalRuleId',
    approverId: 'approverId',
    stepOrder: 'stepOrder'
  };

  export type ApprovalStepScalarFieldEnum = (typeof ApprovalStepScalarFieldEnum)[keyof typeof ApprovalStepScalarFieldEnum]


  export const ApprovalActionScalarFieldEnum: {
    id: 'id',
    expenseId: 'expenseId',
    approverId: 'approverId',
    action: 'action',
    comment: 'comment',
    stepOrder: 'stepOrder',
    createdAt: 'createdAt'
  };

  export type ApprovalActionScalarFieldEnum = (typeof ApprovalActionScalarFieldEnum)[keyof typeof ApprovalActionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    refresh_token_expires_in: 'refresh_token_expires_in'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ExpenseStatus'
   */
  export type EnumExpenseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseStatus'>
    


  /**
   * Reference to a field of type 'ExpenseStatus[]'
   */
  export type ListEnumExpenseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ApprovalRuleType'
   */
  export type EnumApprovalRuleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalRuleType'>
    


  /**
   * Reference to a field of type 'ApprovalRuleType[]'
   */
  export type ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalRuleType[]'>
    


  /**
   * Reference to a field of type 'ApprovalActionType'
   */
  export type EnumApprovalActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalActionType'>
    


  /**
   * Reference to a field of type 'ApprovalActionType[]'
   */
  export type ListEnumApprovalActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalActionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CurrencyWhereInput = {
    AND?: CurrencyWhereInput | CurrencyWhereInput[]
    OR?: CurrencyWhereInput[]
    NOT?: CurrencyWhereInput | CurrencyWhereInput[]
    id?: StringFilter<"Currency"> | string
    name?: StringFilter<"Currency"> | string
    symbol?: StringFilter<"Currency"> | string
    companies?: CompanyListRelationFilter
    expenses?: ExpenseListRelationFilter
    exchangeRatesFrom?: ExchangeRateCacheListRelationFilter
  }

  export type CurrencyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    companies?: CompanyOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    exchangeRatesFrom?: ExchangeRateCacheOrderByRelationAggregateInput
  }

  export type CurrencyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CurrencyWhereInput | CurrencyWhereInput[]
    OR?: CurrencyWhereInput[]
    NOT?: CurrencyWhereInput | CurrencyWhereInput[]
    name?: StringFilter<"Currency"> | string
    symbol?: StringFilter<"Currency"> | string
    companies?: CompanyListRelationFilter
    expenses?: ExpenseListRelationFilter
    exchangeRatesFrom?: ExchangeRateCacheListRelationFilter
  }, "id">

  export type CurrencyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    _count?: CurrencyCountOrderByAggregateInput
    _max?: CurrencyMaxOrderByAggregateInput
    _min?: CurrencyMinOrderByAggregateInput
  }

  export type CurrencyScalarWhereWithAggregatesInput = {
    AND?: CurrencyScalarWhereWithAggregatesInput | CurrencyScalarWhereWithAggregatesInput[]
    OR?: CurrencyScalarWhereWithAggregatesInput[]
    NOT?: CurrencyScalarWhereWithAggregatesInput | CurrencyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Currency"> | string
    name?: StringWithAggregatesFilter<"Currency"> | string
    symbol?: StringWithAggregatesFilter<"Currency"> | string
  }

  export type ExchangeRateCacheWhereInput = {
    AND?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    OR?: ExchangeRateCacheWhereInput[]
    NOT?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    id?: StringFilter<"ExchangeRateCache"> | string
    fromCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    toCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    rate?: DecimalFilter<"ExchangeRateCache"> | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
    fromCurrency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
  }

  export type ExchangeRateCacheOrderByWithRelationInput = {
    id?: SortOrder
    fromCurrencyId?: SortOrder
    toCurrencyId?: SortOrder
    rate?: SortOrder
    fetchedAt?: SortOrder
    fromCurrency?: CurrencyOrderByWithRelationInput
  }

  export type ExchangeRateCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fromCurrencyId_toCurrencyId?: ExchangeRateCacheFromCurrencyIdToCurrencyIdCompoundUniqueInput
    AND?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    OR?: ExchangeRateCacheWhereInput[]
    NOT?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    fromCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    toCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    rate?: DecimalFilter<"ExchangeRateCache"> | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
    fromCurrency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
  }, "id" | "fromCurrencyId_toCurrencyId">

  export type ExchangeRateCacheOrderByWithAggregationInput = {
    id?: SortOrder
    fromCurrencyId?: SortOrder
    toCurrencyId?: SortOrder
    rate?: SortOrder
    fetchedAt?: SortOrder
    _count?: ExchangeRateCacheCountOrderByAggregateInput
    _avg?: ExchangeRateCacheAvgOrderByAggregateInput
    _max?: ExchangeRateCacheMaxOrderByAggregateInput
    _min?: ExchangeRateCacheMinOrderByAggregateInput
    _sum?: ExchangeRateCacheSumOrderByAggregateInput
  }

  export type ExchangeRateCacheScalarWhereWithAggregatesInput = {
    AND?: ExchangeRateCacheScalarWhereWithAggregatesInput | ExchangeRateCacheScalarWhereWithAggregatesInput[]
    OR?: ExchangeRateCacheScalarWhereWithAggregatesInput[]
    NOT?: ExchangeRateCacheScalarWhereWithAggregatesInput | ExchangeRateCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeRateCache"> | string
    fromCurrencyId?: StringWithAggregatesFilter<"ExchangeRateCache"> | string
    toCurrencyId?: StringWithAggregatesFilter<"ExchangeRateCache"> | string
    rate?: DecimalWithAggregatesFilter<"ExchangeRateCache"> | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeWithAggregatesFilter<"ExchangeRateCache"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    country?: StringFilter<"Company"> | string
    baseCurrencyId?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    baseCurrency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
    users?: UserListRelationFilter
    categories?: ExpenseCategoryListRelationFilter
    approvalRules?: ApprovalRuleListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    baseCurrencyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baseCurrency?: CurrencyOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    categories?: ExpenseCategoryOrderByRelationAggregateInput
    approvalRules?: ApprovalRuleOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    country?: StringFilter<"Company"> | string
    baseCurrencyId?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    baseCurrency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
    users?: UserListRelationFilter
    categories?: ExpenseCategoryListRelationFilter
    approvalRules?: ApprovalRuleListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    baseCurrencyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    country?: StringWithAggregatesFilter<"Company"> | string
    baseCurrencyId?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    designation?: StringNullableFilter<"User"> | string | null
    companyId?: StringNullableFilter<"User"> | string | null
    managerId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subordinates?: UserListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    expenses?: ExpenseListRelationFilter
    approvalActions?: ApprovalActionListRelationFilter
    approvalSteps?: ApprovalStepListRelationFilter
    specificApproverFor?: ApprovalRuleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    designation?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    company?: CompanyOrderByWithRelationInput
    manager?: UserOrderByWithRelationInput
    subordinates?: UserOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    approvalActions?: ApprovalActionOrderByRelationAggregateInput
    approvalSteps?: ApprovalStepOrderByRelationAggregateInput
    specificApproverFor?: ApprovalRuleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    designation?: StringNullableFilter<"User"> | string | null
    companyId?: StringNullableFilter<"User"> | string | null
    managerId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subordinates?: UserListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    expenses?: ExpenseListRelationFilter
    approvalActions?: ApprovalActionListRelationFilter
    approvalSteps?: ApprovalStepListRelationFilter
    specificApproverFor?: ApprovalRuleListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    designation?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    designation?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"User"> | string | null
    managerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type ExpenseCategoryWhereInput = {
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    id?: StringFilter<"ExpenseCategory"> | string
    name?: StringFilter<"ExpenseCategory"> | string
    description?: StringNullableFilter<"ExpenseCategory"> | string | null
    companyId?: StringFilter<"ExpenseCategory"> | string
    isActive?: BoolFilter<"ExpenseCategory"> | boolean
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    expenses?: ExpenseListRelationFilter
  }

  export type ExpenseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    company?: CompanyOrderByWithRelationInput
    expenses?: ExpenseOrderByRelationAggregateInput
  }

  export type ExpenseCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_name?: ExpenseCategoryCompanyIdNameCompoundUniqueInput
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    name?: StringFilter<"ExpenseCategory"> | string
    description?: StringNullableFilter<"ExpenseCategory"> | string | null
    companyId?: StringFilter<"ExpenseCategory"> | string
    isActive?: BoolFilter<"ExpenseCategory"> | boolean
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    expenses?: ExpenseListRelationFilter
  }, "id" | "companyId_name">

  export type ExpenseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    _count?: ExpenseCategoryCountOrderByAggregateInput
    _max?: ExpenseCategoryMaxOrderByAggregateInput
    _min?: ExpenseCategoryMinOrderByAggregateInput
  }

  export type ExpenseCategoryScalarWhereWithAggregatesInput = {
    AND?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    OR?: ExpenseCategoryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    name?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    description?: StringNullableWithAggregatesFilter<"ExpenseCategory"> | string | null
    companyId?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    isActive?: BoolWithAggregatesFilter<"ExpenseCategory"> | boolean
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    subject?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    totalAmount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    currencyId?: StringFilter<"Expense"> | string
    convertedAmount?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus
    remarks?: StringNullableFilter<"Expense"> | string | null
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringFilter<"Expense"> | string
    submitterId?: StringFilter<"Expense"> | string
    approvalRuleId?: StringNullableFilter<"Expense"> | string | null
    currentStepOrder?: IntNullableFilter<"Expense"> | number | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    submittedAt?: DateTimeNullableFilter<"Expense"> | Date | string | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    submitter?: XOR<UserScalarRelationFilter, UserWhereInput>
    currency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
    approvalRule?: XOR<ApprovalRuleNullableScalarRelationFilter, ApprovalRuleWhereInput> | null
    approvalActions?: ApprovalActionListRelationFilter
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    expenseDate?: SortOrder
    totalAmount?: SortOrder
    currencyId?: SortOrder
    convertedAmount?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    submitterId?: SortOrder
    approvalRuleId?: SortOrderInput | SortOrder
    currentStepOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    category?: ExpenseCategoryOrderByWithRelationInput
    submitter?: UserOrderByWithRelationInput
    currency?: CurrencyOrderByWithRelationInput
    approvalRule?: ApprovalRuleOrderByWithRelationInput
    approvalActions?: ApprovalActionOrderByRelationAggregateInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    subject?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    totalAmount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    currencyId?: StringFilter<"Expense"> | string
    convertedAmount?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus
    remarks?: StringNullableFilter<"Expense"> | string | null
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringFilter<"Expense"> | string
    submitterId?: StringFilter<"Expense"> | string
    approvalRuleId?: StringNullableFilter<"Expense"> | string | null
    currentStepOrder?: IntNullableFilter<"Expense"> | number | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    submittedAt?: DateTimeNullableFilter<"Expense"> | Date | string | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    submitter?: XOR<UserScalarRelationFilter, UserWhereInput>
    currency?: XOR<CurrencyScalarRelationFilter, CurrencyWhereInput>
    approvalRule?: XOR<ApprovalRuleNullableScalarRelationFilter, ApprovalRuleWhereInput> | null
    approvalActions?: ApprovalActionListRelationFilter
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    expenseDate?: SortOrder
    totalAmount?: SortOrder
    currencyId?: SortOrder
    convertedAmount?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    submitterId?: SortOrder
    approvalRuleId?: SortOrderInput | SortOrder
    currentStepOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    subject?: StringWithAggregatesFilter<"Expense"> | string
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    expenseDate?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    totalAmount?: DecimalWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    currencyId?: StringWithAggregatesFilter<"Expense"> | string
    convertedAmount?: DecimalNullableWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusWithAggregatesFilter<"Expense"> | $Enums.ExpenseStatus
    remarks?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    receiptUrl?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    categoryId?: StringWithAggregatesFilter<"Expense"> | string
    submitterId?: StringWithAggregatesFilter<"Expense"> | string
    approvalRuleId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    currentStepOrder?: IntNullableWithAggregatesFilter<"Expense"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    submittedAt?: DateTimeNullableWithAggregatesFilter<"Expense"> | Date | string | null
  }

  export type ApprovalRuleWhereInput = {
    AND?: ApprovalRuleWhereInput | ApprovalRuleWhereInput[]
    OR?: ApprovalRuleWhereInput[]
    NOT?: ApprovalRuleWhereInput | ApprovalRuleWhereInput[]
    id?: StringFilter<"ApprovalRule"> | string
    name?: StringFilter<"ApprovalRule"> | string
    companyId?: StringFilter<"ApprovalRule"> | string
    ruleType?: EnumApprovalRuleTypeFilter<"ApprovalRule"> | $Enums.ApprovalRuleType
    requiredPercent?: IntNullableFilter<"ApprovalRule"> | number | null
    specificApproverId?: StringNullableFilter<"ApprovalRule"> | string | null
    isManagerFirst?: BoolFilter<"ApprovalRule"> | boolean
    isDefault?: BoolFilter<"ApprovalRule"> | boolean
    isActive?: BoolFilter<"ApprovalRule"> | boolean
    createdAt?: DateTimeFilter<"ApprovalRule"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRule"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    specificApprover?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    steps?: ApprovalStepListRelationFilter
    expenses?: ExpenseListRelationFilter
  }

  export type ApprovalRuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    ruleType?: SortOrder
    requiredPercent?: SortOrderInput | SortOrder
    specificApproverId?: SortOrderInput | SortOrder
    isManagerFirst?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    specificApprover?: UserOrderByWithRelationInput
    steps?: ApprovalStepOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
  }

  export type ApprovalRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalRuleWhereInput | ApprovalRuleWhereInput[]
    OR?: ApprovalRuleWhereInput[]
    NOT?: ApprovalRuleWhereInput | ApprovalRuleWhereInput[]
    name?: StringFilter<"ApprovalRule"> | string
    companyId?: StringFilter<"ApprovalRule"> | string
    ruleType?: EnumApprovalRuleTypeFilter<"ApprovalRule"> | $Enums.ApprovalRuleType
    requiredPercent?: IntNullableFilter<"ApprovalRule"> | number | null
    specificApproverId?: StringNullableFilter<"ApprovalRule"> | string | null
    isManagerFirst?: BoolFilter<"ApprovalRule"> | boolean
    isDefault?: BoolFilter<"ApprovalRule"> | boolean
    isActive?: BoolFilter<"ApprovalRule"> | boolean
    createdAt?: DateTimeFilter<"ApprovalRule"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRule"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    specificApprover?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    steps?: ApprovalStepListRelationFilter
    expenses?: ExpenseListRelationFilter
  }, "id">

  export type ApprovalRuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    ruleType?: SortOrder
    requiredPercent?: SortOrderInput | SortOrder
    specificApproverId?: SortOrderInput | SortOrder
    isManagerFirst?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApprovalRuleCountOrderByAggregateInput
    _avg?: ApprovalRuleAvgOrderByAggregateInput
    _max?: ApprovalRuleMaxOrderByAggregateInput
    _min?: ApprovalRuleMinOrderByAggregateInput
    _sum?: ApprovalRuleSumOrderByAggregateInput
  }

  export type ApprovalRuleScalarWhereWithAggregatesInput = {
    AND?: ApprovalRuleScalarWhereWithAggregatesInput | ApprovalRuleScalarWhereWithAggregatesInput[]
    OR?: ApprovalRuleScalarWhereWithAggregatesInput[]
    NOT?: ApprovalRuleScalarWhereWithAggregatesInput | ApprovalRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalRule"> | string
    name?: StringWithAggregatesFilter<"ApprovalRule"> | string
    companyId?: StringWithAggregatesFilter<"ApprovalRule"> | string
    ruleType?: EnumApprovalRuleTypeWithAggregatesFilter<"ApprovalRule"> | $Enums.ApprovalRuleType
    requiredPercent?: IntNullableWithAggregatesFilter<"ApprovalRule"> | number | null
    specificApproverId?: StringNullableWithAggregatesFilter<"ApprovalRule"> | string | null
    isManagerFirst?: BoolWithAggregatesFilter<"ApprovalRule"> | boolean
    isDefault?: BoolWithAggregatesFilter<"ApprovalRule"> | boolean
    isActive?: BoolWithAggregatesFilter<"ApprovalRule"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ApprovalRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApprovalRule"> | Date | string
  }

  export type ApprovalStepWhereInput = {
    AND?: ApprovalStepWhereInput | ApprovalStepWhereInput[]
    OR?: ApprovalStepWhereInput[]
    NOT?: ApprovalStepWhereInput | ApprovalStepWhereInput[]
    id?: StringFilter<"ApprovalStep"> | string
    approvalRuleId?: StringFilter<"ApprovalStep"> | string
    approverId?: StringFilter<"ApprovalStep"> | string
    stepOrder?: IntFilter<"ApprovalStep"> | number
    approvalRule?: XOR<ApprovalRuleScalarRelationFilter, ApprovalRuleWhereInput>
    approver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApprovalStepOrderByWithRelationInput = {
    id?: SortOrder
    approvalRuleId?: SortOrder
    approverId?: SortOrder
    stepOrder?: SortOrder
    approvalRule?: ApprovalRuleOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
  }

  export type ApprovalStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approvalRuleId_stepOrder?: ApprovalStepApprovalRuleIdStepOrderCompoundUniqueInput
    approvalRuleId_approverId?: ApprovalStepApprovalRuleIdApproverIdCompoundUniqueInput
    AND?: ApprovalStepWhereInput | ApprovalStepWhereInput[]
    OR?: ApprovalStepWhereInput[]
    NOT?: ApprovalStepWhereInput | ApprovalStepWhereInput[]
    approvalRuleId?: StringFilter<"ApprovalStep"> | string
    approverId?: StringFilter<"ApprovalStep"> | string
    stepOrder?: IntFilter<"ApprovalStep"> | number
    approvalRule?: XOR<ApprovalRuleScalarRelationFilter, ApprovalRuleWhereInput>
    approver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "approvalRuleId_stepOrder" | "approvalRuleId_approverId">

  export type ApprovalStepOrderByWithAggregationInput = {
    id?: SortOrder
    approvalRuleId?: SortOrder
    approverId?: SortOrder
    stepOrder?: SortOrder
    _count?: ApprovalStepCountOrderByAggregateInput
    _avg?: ApprovalStepAvgOrderByAggregateInput
    _max?: ApprovalStepMaxOrderByAggregateInput
    _min?: ApprovalStepMinOrderByAggregateInput
    _sum?: ApprovalStepSumOrderByAggregateInput
  }

  export type ApprovalStepScalarWhereWithAggregatesInput = {
    AND?: ApprovalStepScalarWhereWithAggregatesInput | ApprovalStepScalarWhereWithAggregatesInput[]
    OR?: ApprovalStepScalarWhereWithAggregatesInput[]
    NOT?: ApprovalStepScalarWhereWithAggregatesInput | ApprovalStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalStep"> | string
    approvalRuleId?: StringWithAggregatesFilter<"ApprovalStep"> | string
    approverId?: StringWithAggregatesFilter<"ApprovalStep"> | string
    stepOrder?: IntWithAggregatesFilter<"ApprovalStep"> | number
  }

  export type ApprovalActionWhereInput = {
    AND?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    OR?: ApprovalActionWhereInput[]
    NOT?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    id?: StringFilter<"ApprovalAction"> | string
    expenseId?: StringFilter<"ApprovalAction"> | string
    approverId?: StringFilter<"ApprovalAction"> | string
    action?: EnumApprovalActionTypeFilter<"ApprovalAction"> | $Enums.ApprovalActionType
    comment?: StringNullableFilter<"ApprovalAction"> | string | null
    stepOrder?: IntFilter<"ApprovalAction"> | number
    createdAt?: DateTimeFilter<"ApprovalAction"> | Date | string
    expense?: XOR<ExpenseScalarRelationFilter, ExpenseWhereInput>
    approver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApprovalActionOrderByWithRelationInput = {
    id?: SortOrder
    expenseId?: SortOrder
    approverId?: SortOrder
    action?: SortOrder
    comment?: SortOrderInput | SortOrder
    stepOrder?: SortOrder
    createdAt?: SortOrder
    expense?: ExpenseOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
  }

  export type ApprovalActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    OR?: ApprovalActionWhereInput[]
    NOT?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    expenseId?: StringFilter<"ApprovalAction"> | string
    approverId?: StringFilter<"ApprovalAction"> | string
    action?: EnumApprovalActionTypeFilter<"ApprovalAction"> | $Enums.ApprovalActionType
    comment?: StringNullableFilter<"ApprovalAction"> | string | null
    stepOrder?: IntFilter<"ApprovalAction"> | number
    createdAt?: DateTimeFilter<"ApprovalAction"> | Date | string
    expense?: XOR<ExpenseScalarRelationFilter, ExpenseWhereInput>
    approver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ApprovalActionOrderByWithAggregationInput = {
    id?: SortOrder
    expenseId?: SortOrder
    approverId?: SortOrder
    action?: SortOrder
    comment?: SortOrderInput | SortOrder
    stepOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ApprovalActionCountOrderByAggregateInput
    _avg?: ApprovalActionAvgOrderByAggregateInput
    _max?: ApprovalActionMaxOrderByAggregateInput
    _min?: ApprovalActionMinOrderByAggregateInput
    _sum?: ApprovalActionSumOrderByAggregateInput
  }

  export type ApprovalActionScalarWhereWithAggregatesInput = {
    AND?: ApprovalActionScalarWhereWithAggregatesInput | ApprovalActionScalarWhereWithAggregatesInput[]
    OR?: ApprovalActionScalarWhereWithAggregatesInput[]
    NOT?: ApprovalActionScalarWhereWithAggregatesInput | ApprovalActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalAction"> | string
    expenseId?: StringWithAggregatesFilter<"ApprovalAction"> | string
    approverId?: StringWithAggregatesFilter<"ApprovalAction"> | string
    action?: EnumApprovalActionTypeWithAggregatesFilter<"ApprovalAction"> | $Enums.ApprovalActionType
    comment?: StringNullableWithAggregatesFilter<"ApprovalAction"> | string | null
    stepOrder?: IntWithAggregatesFilter<"ApprovalAction"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ApprovalAction"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type CurrencyCreateInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyCreateNestedManyWithoutBaseCurrencyInput
    expenses?: ExpenseCreateNestedManyWithoutCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyUncheckedCreateInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyUncheckedCreateNestedManyWithoutBaseCurrencyInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUpdateManyWithoutBaseCurrencyNestedInput
    expenses?: ExpenseUpdateManyWithoutCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUpdateManyWithoutFromCurrencyNestedInput
  }

  export type CurrencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUncheckedUpdateManyWithoutBaseCurrencyNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyNestedInput
  }

  export type CurrencyCreateManyInput = {
    id: string
    name: string
    symbol: string
  }

  export type CurrencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
  }

  export type CurrencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeRateCacheCreateInput = {
    id?: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
    fromCurrency: CurrencyCreateNestedOneWithoutExchangeRatesFromInput
  }

  export type ExchangeRateCacheUncheckedCreateInput = {
    id?: string
    fromCurrencyId: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
  }

  export type ExchangeRateCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: CurrencyUpdateOneRequiredWithoutExchangeRatesFromNestedInput
  }

  export type ExchangeRateCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromCurrencyId?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheCreateManyInput = {
    id?: string
    fromCurrencyId: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
  }

  export type ExchangeRateCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromCurrencyId?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    baseCurrency: CurrencyCreateNestedOneWithoutCompaniesInput
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseCurrency?: CurrencyUpdateOneRequiredWithoutCompaniesNestedInput
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    baseCurrencyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    baseCurrencyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExpenseCategoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    company: CompanyCreateNestedOneWithoutCategoriesInput
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    companyId: string
    isActive?: boolean
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    companyId: string
    isActive?: boolean
  }

  export type ExpenseCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExpenseCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExpenseCreateInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    submitter: UserCreateNestedOneWithoutExpensesInput
    currency: CurrencyCreateNestedOneWithoutExpensesInput
    approvalRule?: ApprovalRuleCreateNestedOneWithoutExpensesInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    submitter?: UserUpdateOneRequiredWithoutExpensesNestedInput
    currency?: CurrencyUpdateOneRequiredWithoutExpensesNestedInput
    approvalRule?: ApprovalRuleUpdateOneWithoutExpensesNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseCreateManyInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApprovalRuleCreateInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutApprovalRulesInput
    specificApprover?: UserCreateNestedOneWithoutSpecificApproverForInput
    steps?: ApprovalStepCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUncheckedCreateInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: ApprovalStepUncheckedCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApprovalRulesNestedInput
    specificApprover?: UserUpdateOneWithoutSpecificApproverForNestedInput
    steps?: ApprovalStepUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: ApprovalStepUncheckedUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleCreateManyInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApprovalRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalStepCreateInput = {
    id?: string
    stepOrder: number
    approvalRule: ApprovalRuleCreateNestedOneWithoutStepsInput
    approver: UserCreateNestedOneWithoutApprovalStepsInput
  }

  export type ApprovalStepUncheckedCreateInput = {
    id?: string
    approvalRuleId: string
    approverId: string
    stepOrder: number
  }

  export type ApprovalStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
    approvalRule?: ApprovalRuleUpdateOneRequiredWithoutStepsNestedInput
    approver?: UserUpdateOneRequiredWithoutApprovalStepsNestedInput
  }

  export type ApprovalStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalStepCreateManyInput = {
    id?: string
    approvalRuleId: string
    approverId: string
    stepOrder: number
  }

  export type ApprovalStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalActionCreateInput = {
    id?: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
    expense: ExpenseCreateNestedOneWithoutApprovalActionsInput
    approver: UserCreateNestedOneWithoutApprovalActionsInput
  }

  export type ApprovalActionUncheckedCreateInput = {
    id?: string
    expenseId: string
    approverId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expense?: ExpenseUpdateOneRequiredWithoutApprovalActionsNestedInput
    approver?: UserUpdateOneRequiredWithoutApprovalActionsNestedInput
  }

  export type ApprovalActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expenseId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalActionCreateManyInput = {
    id?: string
    expenseId: string
    approverId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expenseId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CompanyListRelationFilter = {
    every?: CompanyWhereInput
    some?: CompanyWhereInput
    none?: CompanyWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type ExchangeRateCacheListRelationFilter = {
    every?: ExchangeRateCacheWhereInput
    some?: ExchangeRateCacheWhereInput
    none?: ExchangeRateCacheWhereInput
  }

  export type CompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExchangeRateCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CurrencyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
  }

  export type CurrencyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
  }

  export type CurrencyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CurrencyScalarRelationFilter = {
    is?: CurrencyWhereInput
    isNot?: CurrencyWhereInput
  }

  export type ExchangeRateCacheFromCurrencyIdToCurrencyIdCompoundUniqueInput = {
    fromCurrencyId: string
    toCurrencyId: string
  }

  export type ExchangeRateCacheCountOrderByAggregateInput = {
    id?: SortOrder
    fromCurrencyId?: SortOrder
    toCurrencyId?: SortOrder
    rate?: SortOrder
    fetchedAt?: SortOrder
  }

  export type ExchangeRateCacheAvgOrderByAggregateInput = {
    rate?: SortOrder
  }

  export type ExchangeRateCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    fromCurrencyId?: SortOrder
    toCurrencyId?: SortOrder
    rate?: SortOrder
    fetchedAt?: SortOrder
  }

  export type ExchangeRateCacheMinOrderByAggregateInput = {
    id?: SortOrder
    fromCurrencyId?: SortOrder
    toCurrencyId?: SortOrder
    rate?: SortOrder
    fetchedAt?: SortOrder
  }

  export type ExchangeRateCacheSumOrderByAggregateInput = {
    rate?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ExpenseCategoryListRelationFilter = {
    every?: ExpenseCategoryWhereInput
    some?: ExpenseCategoryWhereInput
    none?: ExpenseCategoryWhereInput
  }

  export type ApprovalRuleListRelationFilter = {
    every?: ApprovalRuleWhereInput
    some?: ApprovalRuleWhereInput
    none?: ApprovalRuleWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApprovalRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    baseCurrencyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    baseCurrencyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    baseCurrencyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ApprovalActionListRelationFilter = {
    every?: ApprovalActionWhereInput
    some?: ApprovalActionWhereInput
    none?: ApprovalActionWhereInput
  }

  export type ApprovalStepListRelationFilter = {
    every?: ApprovalStepWhereInput
    some?: ApprovalStepWhereInput
    none?: ApprovalStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApprovalActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApprovalStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    designation?: SortOrder
    companyId?: SortOrder
    managerId?: SortOrder
    isActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    designation?: SortOrder
    companyId?: SortOrder
    managerId?: SortOrder
    isActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    designation?: SortOrder
    companyId?: SortOrder
    managerId?: SortOrder
    isActive?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type ExpenseCategoryCompanyIdNameCompoundUniqueInput = {
    companyId: string
    name: string
  }

  export type ExpenseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
  }

  export type ExpenseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
  }

  export type ExpenseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type EnumExpenseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseStatus | EnumExpenseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseStatusFilter<$PrismaModel> | $Enums.ExpenseStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ExpenseCategoryScalarRelationFilter = {
    is?: ExpenseCategoryWhereInput
    isNot?: ExpenseCategoryWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ApprovalRuleNullableScalarRelationFilter = {
    is?: ApprovalRuleWhereInput | null
    isNot?: ApprovalRuleWhereInput | null
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    expenseDate?: SortOrder
    totalAmount?: SortOrder
    currencyId?: SortOrder
    convertedAmount?: SortOrder
    exchangeRate?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptUrl?: SortOrder
    categoryId?: SortOrder
    submitterId?: SortOrder
    approvalRuleId?: SortOrder
    currentStepOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedAt?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    convertedAmount?: SortOrder
    exchangeRate?: SortOrder
    currentStepOrder?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    expenseDate?: SortOrder
    totalAmount?: SortOrder
    currencyId?: SortOrder
    convertedAmount?: SortOrder
    exchangeRate?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptUrl?: SortOrder
    categoryId?: SortOrder
    submitterId?: SortOrder
    approvalRuleId?: SortOrder
    currentStepOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedAt?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    expenseDate?: SortOrder
    totalAmount?: SortOrder
    currencyId?: SortOrder
    convertedAmount?: SortOrder
    exchangeRate?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    receiptUrl?: SortOrder
    categoryId?: SortOrder
    submitterId?: SortOrder
    approvalRuleId?: SortOrder
    currentStepOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedAt?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    convertedAmount?: SortOrder
    exchangeRate?: SortOrder
    currentStepOrder?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumExpenseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseStatus | EnumExpenseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseStatusFilter<$PrismaModel>
    _max?: NestedEnumExpenseStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumApprovalRuleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalRuleType | EnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalRuleTypeFilter<$PrismaModel> | $Enums.ApprovalRuleType
  }

  export type ApprovalRuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    ruleType?: SortOrder
    requiredPercent?: SortOrder
    specificApproverId?: SortOrder
    isManagerFirst?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRuleAvgOrderByAggregateInput = {
    requiredPercent?: SortOrder
  }

  export type ApprovalRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    ruleType?: SortOrder
    requiredPercent?: SortOrder
    specificApproverId?: SortOrder
    isManagerFirst?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    ruleType?: SortOrder
    requiredPercent?: SortOrder
    specificApproverId?: SortOrder
    isManagerFirst?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRuleSumOrderByAggregateInput = {
    requiredPercent?: SortOrder
  }

  export type EnumApprovalRuleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalRuleType | EnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalRuleTypeWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalRuleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalRuleTypeFilter<$PrismaModel>
    _max?: NestedEnumApprovalRuleTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ApprovalRuleScalarRelationFilter = {
    is?: ApprovalRuleWhereInput
    isNot?: ApprovalRuleWhereInput
  }

  export type ApprovalStepApprovalRuleIdStepOrderCompoundUniqueInput = {
    approvalRuleId: string
    stepOrder: number
  }

  export type ApprovalStepApprovalRuleIdApproverIdCompoundUniqueInput = {
    approvalRuleId: string
    approverId: string
  }

  export type ApprovalStepCountOrderByAggregateInput = {
    id?: SortOrder
    approvalRuleId?: SortOrder
    approverId?: SortOrder
    stepOrder?: SortOrder
  }

  export type ApprovalStepAvgOrderByAggregateInput = {
    stepOrder?: SortOrder
  }

  export type ApprovalStepMaxOrderByAggregateInput = {
    id?: SortOrder
    approvalRuleId?: SortOrder
    approverId?: SortOrder
    stepOrder?: SortOrder
  }

  export type ApprovalStepMinOrderByAggregateInput = {
    id?: SortOrder
    approvalRuleId?: SortOrder
    approverId?: SortOrder
    stepOrder?: SortOrder
  }

  export type ApprovalStepSumOrderByAggregateInput = {
    stepOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumApprovalActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalActionType | EnumApprovalActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalActionTypeFilter<$PrismaModel> | $Enums.ApprovalActionType
  }

  export type ExpenseScalarRelationFilter = {
    is?: ExpenseWhereInput
    isNot?: ExpenseWhereInput
  }

  export type ApprovalActionCountOrderByAggregateInput = {
    id?: SortOrder
    expenseId?: SortOrder
    approverId?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    stepOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ApprovalActionAvgOrderByAggregateInput = {
    stepOrder?: SortOrder
  }

  export type ApprovalActionMaxOrderByAggregateInput = {
    id?: SortOrder
    expenseId?: SortOrder
    approverId?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    stepOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ApprovalActionMinOrderByAggregateInput = {
    id?: SortOrder
    expenseId?: SortOrder
    approverId?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    stepOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ApprovalActionSumOrderByAggregateInput = {
    stepOrder?: SortOrder
  }

  export type EnumApprovalActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalActionType | EnumApprovalActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalActionTypeFilter<$PrismaModel>
    _max?: NestedEnumApprovalActionTypeFilter<$PrismaModel>
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type CompanyCreateNestedManyWithoutBaseCurrencyInput = {
    create?: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput> | CompanyCreateWithoutBaseCurrencyInput[] | CompanyUncheckedCreateWithoutBaseCurrencyInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutBaseCurrencyInput | CompanyCreateOrConnectWithoutBaseCurrencyInput[]
    createMany?: CompanyCreateManyBaseCurrencyInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput> | ExpenseCreateWithoutCurrencyInput[] | ExpenseUncheckedCreateWithoutCurrencyInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCurrencyInput | ExpenseCreateOrConnectWithoutCurrencyInput[]
    createMany?: ExpenseCreateManyCurrencyInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExchangeRateCacheCreateNestedManyWithoutFromCurrencyInput = {
    create?: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput> | ExchangeRateCacheCreateWithoutFromCurrencyInput[] | ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput[]
    connectOrCreate?: ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput | ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput[]
    createMany?: ExchangeRateCacheCreateManyFromCurrencyInputEnvelope
    connect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutBaseCurrencyInput = {
    create?: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput> | CompanyCreateWithoutBaseCurrencyInput[] | CompanyUncheckedCreateWithoutBaseCurrencyInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutBaseCurrencyInput | CompanyCreateOrConnectWithoutBaseCurrencyInput[]
    createMany?: CompanyCreateManyBaseCurrencyInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput> | ExpenseCreateWithoutCurrencyInput[] | ExpenseUncheckedCreateWithoutCurrencyInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCurrencyInput | ExpenseCreateOrConnectWithoutCurrencyInput[]
    createMany?: ExpenseCreateManyCurrencyInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExchangeRateCacheUncheckedCreateNestedManyWithoutFromCurrencyInput = {
    create?: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput> | ExchangeRateCacheCreateWithoutFromCurrencyInput[] | ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput[]
    connectOrCreate?: ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput | ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput[]
    createMany?: ExchangeRateCacheCreateManyFromCurrencyInputEnvelope
    connect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CompanyUpdateManyWithoutBaseCurrencyNestedInput = {
    create?: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput> | CompanyCreateWithoutBaseCurrencyInput[] | CompanyUncheckedCreateWithoutBaseCurrencyInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutBaseCurrencyInput | CompanyCreateOrConnectWithoutBaseCurrencyInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutBaseCurrencyInput | CompanyUpsertWithWhereUniqueWithoutBaseCurrencyInput[]
    createMany?: CompanyCreateManyBaseCurrencyInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutBaseCurrencyInput | CompanyUpdateWithWhereUniqueWithoutBaseCurrencyInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutBaseCurrencyInput | CompanyUpdateManyWithWhereWithoutBaseCurrencyInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutCurrencyNestedInput = {
    create?: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput> | ExpenseCreateWithoutCurrencyInput[] | ExpenseUncheckedCreateWithoutCurrencyInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCurrencyInput | ExpenseCreateOrConnectWithoutCurrencyInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCurrencyInput | ExpenseUpsertWithWhereUniqueWithoutCurrencyInput[]
    createMany?: ExpenseCreateManyCurrencyInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCurrencyInput | ExpenseUpdateWithWhereUniqueWithoutCurrencyInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCurrencyInput | ExpenseUpdateManyWithWhereWithoutCurrencyInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExchangeRateCacheUpdateManyWithoutFromCurrencyNestedInput = {
    create?: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput> | ExchangeRateCacheCreateWithoutFromCurrencyInput[] | ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput[]
    connectOrCreate?: ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput | ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput[]
    upsert?: ExchangeRateCacheUpsertWithWhereUniqueWithoutFromCurrencyInput | ExchangeRateCacheUpsertWithWhereUniqueWithoutFromCurrencyInput[]
    createMany?: ExchangeRateCacheCreateManyFromCurrencyInputEnvelope
    set?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    disconnect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    delete?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    connect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    update?: ExchangeRateCacheUpdateWithWhereUniqueWithoutFromCurrencyInput | ExchangeRateCacheUpdateWithWhereUniqueWithoutFromCurrencyInput[]
    updateMany?: ExchangeRateCacheUpdateManyWithWhereWithoutFromCurrencyInput | ExchangeRateCacheUpdateManyWithWhereWithoutFromCurrencyInput[]
    deleteMany?: ExchangeRateCacheScalarWhereInput | ExchangeRateCacheScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateManyWithoutBaseCurrencyNestedInput = {
    create?: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput> | CompanyCreateWithoutBaseCurrencyInput[] | CompanyUncheckedCreateWithoutBaseCurrencyInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutBaseCurrencyInput | CompanyCreateOrConnectWithoutBaseCurrencyInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutBaseCurrencyInput | CompanyUpsertWithWhereUniqueWithoutBaseCurrencyInput[]
    createMany?: CompanyCreateManyBaseCurrencyInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutBaseCurrencyInput | CompanyUpdateWithWhereUniqueWithoutBaseCurrencyInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutBaseCurrencyInput | CompanyUpdateManyWithWhereWithoutBaseCurrencyInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutCurrencyNestedInput = {
    create?: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput> | ExpenseCreateWithoutCurrencyInput[] | ExpenseUncheckedCreateWithoutCurrencyInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCurrencyInput | ExpenseCreateOrConnectWithoutCurrencyInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCurrencyInput | ExpenseUpsertWithWhereUniqueWithoutCurrencyInput[]
    createMany?: ExpenseCreateManyCurrencyInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCurrencyInput | ExpenseUpdateWithWhereUniqueWithoutCurrencyInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCurrencyInput | ExpenseUpdateManyWithWhereWithoutCurrencyInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyNestedInput = {
    create?: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput> | ExchangeRateCacheCreateWithoutFromCurrencyInput[] | ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput[]
    connectOrCreate?: ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput | ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput[]
    upsert?: ExchangeRateCacheUpsertWithWhereUniqueWithoutFromCurrencyInput | ExchangeRateCacheUpsertWithWhereUniqueWithoutFromCurrencyInput[]
    createMany?: ExchangeRateCacheCreateManyFromCurrencyInputEnvelope
    set?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    disconnect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    delete?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    connect?: ExchangeRateCacheWhereUniqueInput | ExchangeRateCacheWhereUniqueInput[]
    update?: ExchangeRateCacheUpdateWithWhereUniqueWithoutFromCurrencyInput | ExchangeRateCacheUpdateWithWhereUniqueWithoutFromCurrencyInput[]
    updateMany?: ExchangeRateCacheUpdateManyWithWhereWithoutFromCurrencyInput | ExchangeRateCacheUpdateManyWithWhereWithoutFromCurrencyInput[]
    deleteMany?: ExchangeRateCacheScalarWhereInput | ExchangeRateCacheScalarWhereInput[]
  }

  export type CurrencyCreateNestedOneWithoutExchangeRatesFromInput = {
    create?: XOR<CurrencyCreateWithoutExchangeRatesFromInput, CurrencyUncheckedCreateWithoutExchangeRatesFromInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutExchangeRatesFromInput
    connect?: CurrencyWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CurrencyUpdateOneRequiredWithoutExchangeRatesFromNestedInput = {
    create?: XOR<CurrencyCreateWithoutExchangeRatesFromInput, CurrencyUncheckedCreateWithoutExchangeRatesFromInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutExchangeRatesFromInput
    upsert?: CurrencyUpsertWithoutExchangeRatesFromInput
    connect?: CurrencyWhereUniqueInput
    update?: XOR<XOR<CurrencyUpdateToOneWithWhereWithoutExchangeRatesFromInput, CurrencyUpdateWithoutExchangeRatesFromInput>, CurrencyUncheckedUpdateWithoutExchangeRatesFromInput>
  }

  export type CurrencyCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<CurrencyCreateWithoutCompaniesInput, CurrencyUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutCompaniesInput
    connect?: CurrencyWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ExpenseCategoryCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput> | ExpenseCategoryCreateWithoutCompanyInput[] | ExpenseCategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutCompanyInput | ExpenseCategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: ExpenseCategoryCreateManyCompanyInputEnvelope
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
  }

  export type ApprovalRuleCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput> | ApprovalRuleCreateWithoutCompanyInput[] | ApprovalRuleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutCompanyInput | ApprovalRuleCreateOrConnectWithoutCompanyInput[]
    createMany?: ApprovalRuleCreateManyCompanyInputEnvelope
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ExpenseCategoryUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput> | ExpenseCategoryCreateWithoutCompanyInput[] | ExpenseCategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutCompanyInput | ExpenseCategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: ExpenseCategoryCreateManyCompanyInputEnvelope
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
  }

  export type ApprovalRuleUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput> | ApprovalRuleCreateWithoutCompanyInput[] | ApprovalRuleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutCompanyInput | ApprovalRuleCreateOrConnectWithoutCompanyInput[]
    createMany?: ApprovalRuleCreateManyCompanyInputEnvelope
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
  }

  export type CurrencyUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<CurrencyCreateWithoutCompaniesInput, CurrencyUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutCompaniesInput
    upsert?: CurrencyUpsertWithoutCompaniesInput
    connect?: CurrencyWhereUniqueInput
    update?: XOR<XOR<CurrencyUpdateToOneWithWhereWithoutCompaniesInput, CurrencyUpdateWithoutCompaniesInput>, CurrencyUncheckedUpdateWithoutCompaniesInput>
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ExpenseCategoryUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput> | ExpenseCategoryCreateWithoutCompanyInput[] | ExpenseCategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutCompanyInput | ExpenseCategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: ExpenseCategoryUpsertWithWhereUniqueWithoutCompanyInput | ExpenseCategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ExpenseCategoryCreateManyCompanyInputEnvelope
    set?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    disconnect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    delete?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    update?: ExpenseCategoryUpdateWithWhereUniqueWithoutCompanyInput | ExpenseCategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ExpenseCategoryUpdateManyWithWhereWithoutCompanyInput | ExpenseCategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
  }

  export type ApprovalRuleUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput> | ApprovalRuleCreateWithoutCompanyInput[] | ApprovalRuleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutCompanyInput | ApprovalRuleCreateOrConnectWithoutCompanyInput[]
    upsert?: ApprovalRuleUpsertWithWhereUniqueWithoutCompanyInput | ApprovalRuleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ApprovalRuleCreateManyCompanyInputEnvelope
    set?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    disconnect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    delete?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    update?: ApprovalRuleUpdateWithWhereUniqueWithoutCompanyInput | ApprovalRuleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ApprovalRuleUpdateManyWithWhereWithoutCompanyInput | ApprovalRuleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ExpenseCategoryUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput> | ExpenseCategoryCreateWithoutCompanyInput[] | ExpenseCategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutCompanyInput | ExpenseCategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: ExpenseCategoryUpsertWithWhereUniqueWithoutCompanyInput | ExpenseCategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ExpenseCategoryCreateManyCompanyInputEnvelope
    set?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    disconnect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    delete?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    update?: ExpenseCategoryUpdateWithWhereUniqueWithoutCompanyInput | ExpenseCategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ExpenseCategoryUpdateManyWithWhereWithoutCompanyInput | ExpenseCategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
  }

  export type ApprovalRuleUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput> | ApprovalRuleCreateWithoutCompanyInput[] | ApprovalRuleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutCompanyInput | ApprovalRuleCreateOrConnectWithoutCompanyInput[]
    upsert?: ApprovalRuleUpsertWithWhereUniqueWithoutCompanyInput | ApprovalRuleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ApprovalRuleCreateManyCompanyInputEnvelope
    set?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    disconnect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    delete?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    update?: ApprovalRuleUpdateWithWhereUniqueWithoutCompanyInput | ApprovalRuleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ApprovalRuleUpdateManyWithWhereWithoutCompanyInput | ApprovalRuleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubordinatesInput = {
    create?: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubordinatesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutManagerInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput> | ExpenseCreateWithoutSubmitterInput[] | ExpenseUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutSubmitterInput | ExpenseCreateOrConnectWithoutSubmitterInput[]
    createMany?: ExpenseCreateManySubmitterInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ApprovalActionCreateNestedManyWithoutApproverInput = {
    create?: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput> | ApprovalActionCreateWithoutApproverInput[] | ApprovalActionUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutApproverInput | ApprovalActionCreateOrConnectWithoutApproverInput[]
    createMany?: ApprovalActionCreateManyApproverInputEnvelope
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
  }

  export type ApprovalStepCreateNestedManyWithoutApproverInput = {
    create?: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput> | ApprovalStepCreateWithoutApproverInput[] | ApprovalStepUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApproverInput | ApprovalStepCreateOrConnectWithoutApproverInput[]
    createMany?: ApprovalStepCreateManyApproverInputEnvelope
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
  }

  export type ApprovalRuleCreateNestedManyWithoutSpecificApproverInput = {
    create?: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput> | ApprovalRuleCreateWithoutSpecificApproverInput[] | ApprovalRuleUncheckedCreateWithoutSpecificApproverInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutSpecificApproverInput | ApprovalRuleCreateOrConnectWithoutSpecificApproverInput[]
    createMany?: ApprovalRuleCreateManySpecificApproverInputEnvelope
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput> | ExpenseCreateWithoutSubmitterInput[] | ExpenseUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutSubmitterInput | ExpenseCreateOrConnectWithoutSubmitterInput[]
    createMany?: ExpenseCreateManySubmitterInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ApprovalActionUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput> | ApprovalActionCreateWithoutApproverInput[] | ApprovalActionUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutApproverInput | ApprovalActionCreateOrConnectWithoutApproverInput[]
    createMany?: ApprovalActionCreateManyApproverInputEnvelope
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
  }

  export type ApprovalStepUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput> | ApprovalStepCreateWithoutApproverInput[] | ApprovalStepUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApproverInput | ApprovalStepCreateOrConnectWithoutApproverInput[]
    createMany?: ApprovalStepCreateManyApproverInputEnvelope
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
  }

  export type ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput = {
    create?: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput> | ApprovalRuleCreateWithoutSpecificApproverInput[] | ApprovalRuleUncheckedCreateWithoutSpecificApproverInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutSpecificApproverInput | ApprovalRuleCreateOrConnectWithoutSpecificApproverInput[]
    createMany?: ApprovalRuleCreateManySpecificApproverInputEnvelope
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneWithoutSubordinatesNestedInput = {
    create?: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubordinatesInput
    upsert?: UserUpsertWithoutSubordinatesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubordinatesInput, UserUpdateWithoutSubordinatesInput>, UserUncheckedUpdateWithoutSubordinatesInput>
  }

  export type UserUpdateManyWithoutManagerNestedInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagerInput | UserUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagerInput | UserUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagerInput | UserUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput> | ExpenseCreateWithoutSubmitterInput[] | ExpenseUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutSubmitterInput | ExpenseCreateOrConnectWithoutSubmitterInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutSubmitterInput | ExpenseUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: ExpenseCreateManySubmitterInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutSubmitterInput | ExpenseUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutSubmitterInput | ExpenseUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ApprovalActionUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput> | ApprovalActionCreateWithoutApproverInput[] | ApprovalActionUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutApproverInput | ApprovalActionCreateOrConnectWithoutApproverInput[]
    upsert?: ApprovalActionUpsertWithWhereUniqueWithoutApproverInput | ApprovalActionUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ApprovalActionCreateManyApproverInputEnvelope
    set?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    disconnect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    delete?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    update?: ApprovalActionUpdateWithWhereUniqueWithoutApproverInput | ApprovalActionUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ApprovalActionUpdateManyWithWhereWithoutApproverInput | ApprovalActionUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
  }

  export type ApprovalStepUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput> | ApprovalStepCreateWithoutApproverInput[] | ApprovalStepUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApproverInput | ApprovalStepCreateOrConnectWithoutApproverInput[]
    upsert?: ApprovalStepUpsertWithWhereUniqueWithoutApproverInput | ApprovalStepUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ApprovalStepCreateManyApproverInputEnvelope
    set?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    disconnect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    delete?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    update?: ApprovalStepUpdateWithWhereUniqueWithoutApproverInput | ApprovalStepUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ApprovalStepUpdateManyWithWhereWithoutApproverInput | ApprovalStepUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
  }

  export type ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput> | ApprovalRuleCreateWithoutSpecificApproverInput[] | ApprovalRuleUncheckedCreateWithoutSpecificApproverInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutSpecificApproverInput | ApprovalRuleCreateOrConnectWithoutSpecificApproverInput[]
    upsert?: ApprovalRuleUpsertWithWhereUniqueWithoutSpecificApproverInput | ApprovalRuleUpsertWithWhereUniqueWithoutSpecificApproverInput[]
    createMany?: ApprovalRuleCreateManySpecificApproverInputEnvelope
    set?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    disconnect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    delete?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    update?: ApprovalRuleUpdateWithWhereUniqueWithoutSpecificApproverInput | ApprovalRuleUpdateWithWhereUniqueWithoutSpecificApproverInput[]
    updateMany?: ApprovalRuleUpdateManyWithWhereWithoutSpecificApproverInput | ApprovalRuleUpdateManyWithWhereWithoutSpecificApproverInput[]
    deleteMany?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagerInput | UserUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagerInput | UserUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagerInput | UserUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput> | ExpenseCreateWithoutSubmitterInput[] | ExpenseUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutSubmitterInput | ExpenseCreateOrConnectWithoutSubmitterInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutSubmitterInput | ExpenseUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: ExpenseCreateManySubmitterInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutSubmitterInput | ExpenseUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutSubmitterInput | ExpenseUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput> | ApprovalActionCreateWithoutApproverInput[] | ApprovalActionUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutApproverInput | ApprovalActionCreateOrConnectWithoutApproverInput[]
    upsert?: ApprovalActionUpsertWithWhereUniqueWithoutApproverInput | ApprovalActionUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ApprovalActionCreateManyApproverInputEnvelope
    set?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    disconnect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    delete?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    update?: ApprovalActionUpdateWithWhereUniqueWithoutApproverInput | ApprovalActionUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ApprovalActionUpdateManyWithWhereWithoutApproverInput | ApprovalActionUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
  }

  export type ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput> | ApprovalStepCreateWithoutApproverInput[] | ApprovalStepUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApproverInput | ApprovalStepCreateOrConnectWithoutApproverInput[]
    upsert?: ApprovalStepUpsertWithWhereUniqueWithoutApproverInput | ApprovalStepUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ApprovalStepCreateManyApproverInputEnvelope
    set?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    disconnect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    delete?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    update?: ApprovalStepUpdateWithWhereUniqueWithoutApproverInput | ApprovalStepUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ApprovalStepUpdateManyWithWhereWithoutApproverInput | ApprovalStepUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
  }

  export type ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput> | ApprovalRuleCreateWithoutSpecificApproverInput[] | ApprovalRuleUncheckedCreateWithoutSpecificApproverInput[]
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutSpecificApproverInput | ApprovalRuleCreateOrConnectWithoutSpecificApproverInput[]
    upsert?: ApprovalRuleUpsertWithWhereUniqueWithoutSpecificApproverInput | ApprovalRuleUpsertWithWhereUniqueWithoutSpecificApproverInput[]
    createMany?: ApprovalRuleCreateManySpecificApproverInputEnvelope
    set?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    disconnect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    delete?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    connect?: ApprovalRuleWhereUniqueInput | ApprovalRuleWhereUniqueInput[]
    update?: ApprovalRuleUpdateWithWhereUniqueWithoutSpecificApproverInput | ApprovalRuleUpdateWithWhereUniqueWithoutSpecificApproverInput[]
    updateMany?: ApprovalRuleUpdateManyWithWhereWithoutSpecificApproverInput | ApprovalRuleUpdateManyWithWhereWithoutSpecificApproverInput[]
    deleteMany?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
  }

  export type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    upsert?: CompanyUpsertWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCategoriesInput, CompanyUpdateWithoutCategoriesInput>, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseCategoryCreateNestedOneWithoutExpensesInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpensesInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExpensesInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type CurrencyCreateNestedOneWithoutExpensesInput = {
    create?: XOR<CurrencyCreateWithoutExpensesInput, CurrencyUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutExpensesInput
    connect?: CurrencyWhereUniqueInput
  }

  export type ApprovalRuleCreateNestedOneWithoutExpensesInput = {
    create?: XOR<ApprovalRuleCreateWithoutExpensesInput, ApprovalRuleUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutExpensesInput
    connect?: ApprovalRuleWhereUniqueInput
  }

  export type ApprovalActionCreateNestedManyWithoutExpenseInput = {
    create?: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput> | ApprovalActionCreateWithoutExpenseInput[] | ApprovalActionUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutExpenseInput | ApprovalActionCreateOrConnectWithoutExpenseInput[]
    createMany?: ApprovalActionCreateManyExpenseInputEnvelope
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
  }

  export type ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput = {
    create?: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput> | ApprovalActionCreateWithoutExpenseInput[] | ApprovalActionUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutExpenseInput | ApprovalActionCreateOrConnectWithoutExpenseInput[]
    createMany?: ApprovalActionCreateManyExpenseInputEnvelope
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumExpenseStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExpenseStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpensesInput
    upsert?: ExpenseCategoryUpsertWithoutExpensesInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInput, ExpenseCategoryUpdateWithoutExpensesInput>, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    upsert?: UserUpsertWithoutExpensesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpensesInput, UserUpdateWithoutExpensesInput>, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type CurrencyUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<CurrencyCreateWithoutExpensesInput, CurrencyUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutExpensesInput
    upsert?: CurrencyUpsertWithoutExpensesInput
    connect?: CurrencyWhereUniqueInput
    update?: XOR<XOR<CurrencyUpdateToOneWithWhereWithoutExpensesInput, CurrencyUpdateWithoutExpensesInput>, CurrencyUncheckedUpdateWithoutExpensesInput>
  }

  export type ApprovalRuleUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutExpensesInput, ApprovalRuleUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutExpensesInput
    upsert?: ApprovalRuleUpsertWithoutExpensesInput
    disconnect?: ApprovalRuleWhereInput | boolean
    delete?: ApprovalRuleWhereInput | boolean
    connect?: ApprovalRuleWhereUniqueInput
    update?: XOR<XOR<ApprovalRuleUpdateToOneWithWhereWithoutExpensesInput, ApprovalRuleUpdateWithoutExpensesInput>, ApprovalRuleUncheckedUpdateWithoutExpensesInput>
  }

  export type ApprovalActionUpdateManyWithoutExpenseNestedInput = {
    create?: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput> | ApprovalActionCreateWithoutExpenseInput[] | ApprovalActionUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutExpenseInput | ApprovalActionCreateOrConnectWithoutExpenseInput[]
    upsert?: ApprovalActionUpsertWithWhereUniqueWithoutExpenseInput | ApprovalActionUpsertWithWhereUniqueWithoutExpenseInput[]
    createMany?: ApprovalActionCreateManyExpenseInputEnvelope
    set?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    disconnect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    delete?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    update?: ApprovalActionUpdateWithWhereUniqueWithoutExpenseInput | ApprovalActionUpdateWithWhereUniqueWithoutExpenseInput[]
    updateMany?: ApprovalActionUpdateManyWithWhereWithoutExpenseInput | ApprovalActionUpdateManyWithWhereWithoutExpenseInput[]
    deleteMany?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
  }

  export type ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput = {
    create?: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput> | ApprovalActionCreateWithoutExpenseInput[] | ApprovalActionUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: ApprovalActionCreateOrConnectWithoutExpenseInput | ApprovalActionCreateOrConnectWithoutExpenseInput[]
    upsert?: ApprovalActionUpsertWithWhereUniqueWithoutExpenseInput | ApprovalActionUpsertWithWhereUniqueWithoutExpenseInput[]
    createMany?: ApprovalActionCreateManyExpenseInputEnvelope
    set?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    disconnect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    delete?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    connect?: ApprovalActionWhereUniqueInput | ApprovalActionWhereUniqueInput[]
    update?: ApprovalActionUpdateWithWhereUniqueWithoutExpenseInput | ApprovalActionUpdateWithWhereUniqueWithoutExpenseInput[]
    updateMany?: ApprovalActionUpdateManyWithWhereWithoutExpenseInput | ApprovalActionUpdateManyWithWhereWithoutExpenseInput[]
    deleteMany?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutApprovalRulesInput = {
    create?: XOR<CompanyCreateWithoutApprovalRulesInput, CompanyUncheckedCreateWithoutApprovalRulesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutApprovalRulesInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSpecificApproverForInput = {
    create?: XOR<UserCreateWithoutSpecificApproverForInput, UserUncheckedCreateWithoutSpecificApproverForInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpecificApproverForInput
    connect?: UserWhereUniqueInput
  }

  export type ApprovalStepCreateNestedManyWithoutApprovalRuleInput = {
    create?: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput> | ApprovalStepCreateWithoutApprovalRuleInput[] | ApprovalStepUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApprovalRuleInput | ApprovalStepCreateOrConnectWithoutApprovalRuleInput[]
    createMany?: ApprovalStepCreateManyApprovalRuleInputEnvelope
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutApprovalRuleInput = {
    create?: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput> | ExpenseCreateWithoutApprovalRuleInput[] | ExpenseUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalRuleInput | ExpenseCreateOrConnectWithoutApprovalRuleInput[]
    createMany?: ExpenseCreateManyApprovalRuleInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ApprovalStepUncheckedCreateNestedManyWithoutApprovalRuleInput = {
    create?: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput> | ApprovalStepCreateWithoutApprovalRuleInput[] | ApprovalStepUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApprovalRuleInput | ApprovalStepCreateOrConnectWithoutApprovalRuleInput[]
    createMany?: ApprovalStepCreateManyApprovalRuleInputEnvelope
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutApprovalRuleInput = {
    create?: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput> | ExpenseCreateWithoutApprovalRuleInput[] | ExpenseUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalRuleInput | ExpenseCreateOrConnectWithoutApprovalRuleInput[]
    createMany?: ExpenseCreateManyApprovalRuleInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type EnumApprovalRuleTypeFieldUpdateOperationsInput = {
    set?: $Enums.ApprovalRuleType
  }

  export type CompanyUpdateOneRequiredWithoutApprovalRulesNestedInput = {
    create?: XOR<CompanyCreateWithoutApprovalRulesInput, CompanyUncheckedCreateWithoutApprovalRulesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutApprovalRulesInput
    upsert?: CompanyUpsertWithoutApprovalRulesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutApprovalRulesInput, CompanyUpdateWithoutApprovalRulesInput>, CompanyUncheckedUpdateWithoutApprovalRulesInput>
  }

  export type UserUpdateOneWithoutSpecificApproverForNestedInput = {
    create?: XOR<UserCreateWithoutSpecificApproverForInput, UserUncheckedCreateWithoutSpecificApproverForInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpecificApproverForInput
    upsert?: UserUpsertWithoutSpecificApproverForInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSpecificApproverForInput, UserUpdateWithoutSpecificApproverForInput>, UserUncheckedUpdateWithoutSpecificApproverForInput>
  }

  export type ApprovalStepUpdateManyWithoutApprovalRuleNestedInput = {
    create?: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput> | ApprovalStepCreateWithoutApprovalRuleInput[] | ApprovalStepUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApprovalRuleInput | ApprovalStepCreateOrConnectWithoutApprovalRuleInput[]
    upsert?: ApprovalStepUpsertWithWhereUniqueWithoutApprovalRuleInput | ApprovalStepUpsertWithWhereUniqueWithoutApprovalRuleInput[]
    createMany?: ApprovalStepCreateManyApprovalRuleInputEnvelope
    set?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    disconnect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    delete?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    update?: ApprovalStepUpdateWithWhereUniqueWithoutApprovalRuleInput | ApprovalStepUpdateWithWhereUniqueWithoutApprovalRuleInput[]
    updateMany?: ApprovalStepUpdateManyWithWhereWithoutApprovalRuleInput | ApprovalStepUpdateManyWithWhereWithoutApprovalRuleInput[]
    deleteMany?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutApprovalRuleNestedInput = {
    create?: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput> | ExpenseCreateWithoutApprovalRuleInput[] | ExpenseUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalRuleInput | ExpenseCreateOrConnectWithoutApprovalRuleInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutApprovalRuleInput | ExpenseUpsertWithWhereUniqueWithoutApprovalRuleInput[]
    createMany?: ExpenseCreateManyApprovalRuleInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutApprovalRuleInput | ExpenseUpdateWithWhereUniqueWithoutApprovalRuleInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutApprovalRuleInput | ExpenseUpdateManyWithWhereWithoutApprovalRuleInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ApprovalStepUncheckedUpdateManyWithoutApprovalRuleNestedInput = {
    create?: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput> | ApprovalStepCreateWithoutApprovalRuleInput[] | ApprovalStepUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ApprovalStepCreateOrConnectWithoutApprovalRuleInput | ApprovalStepCreateOrConnectWithoutApprovalRuleInput[]
    upsert?: ApprovalStepUpsertWithWhereUniqueWithoutApprovalRuleInput | ApprovalStepUpsertWithWhereUniqueWithoutApprovalRuleInput[]
    createMany?: ApprovalStepCreateManyApprovalRuleInputEnvelope
    set?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    disconnect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    delete?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    connect?: ApprovalStepWhereUniqueInput | ApprovalStepWhereUniqueInput[]
    update?: ApprovalStepUpdateWithWhereUniqueWithoutApprovalRuleInput | ApprovalStepUpdateWithWhereUniqueWithoutApprovalRuleInput[]
    updateMany?: ApprovalStepUpdateManyWithWhereWithoutApprovalRuleInput | ApprovalStepUpdateManyWithWhereWithoutApprovalRuleInput[]
    deleteMany?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutApprovalRuleNestedInput = {
    create?: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput> | ExpenseCreateWithoutApprovalRuleInput[] | ExpenseUncheckedCreateWithoutApprovalRuleInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalRuleInput | ExpenseCreateOrConnectWithoutApprovalRuleInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutApprovalRuleInput | ExpenseUpsertWithWhereUniqueWithoutApprovalRuleInput[]
    createMany?: ExpenseCreateManyApprovalRuleInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutApprovalRuleInput | ExpenseUpdateWithWhereUniqueWithoutApprovalRuleInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutApprovalRuleInput | ExpenseUpdateManyWithWhereWithoutApprovalRuleInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ApprovalRuleCreateNestedOneWithoutStepsInput = {
    create?: XOR<ApprovalRuleCreateWithoutStepsInput, ApprovalRuleUncheckedCreateWithoutStepsInput>
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutStepsInput
    connect?: ApprovalRuleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovalStepsInput = {
    create?: XOR<UserCreateWithoutApprovalStepsInput, UserUncheckedCreateWithoutApprovalStepsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovalStepsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApprovalRuleUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<ApprovalRuleCreateWithoutStepsInput, ApprovalRuleUncheckedCreateWithoutStepsInput>
    connectOrCreate?: ApprovalRuleCreateOrConnectWithoutStepsInput
    upsert?: ApprovalRuleUpsertWithoutStepsInput
    connect?: ApprovalRuleWhereUniqueInput
    update?: XOR<XOR<ApprovalRuleUpdateToOneWithWhereWithoutStepsInput, ApprovalRuleUpdateWithoutStepsInput>, ApprovalRuleUncheckedUpdateWithoutStepsInput>
  }

  export type UserUpdateOneRequiredWithoutApprovalStepsNestedInput = {
    create?: XOR<UserCreateWithoutApprovalStepsInput, UserUncheckedCreateWithoutApprovalStepsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovalStepsInput
    upsert?: UserUpsertWithoutApprovalStepsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovalStepsInput, UserUpdateWithoutApprovalStepsInput>, UserUncheckedUpdateWithoutApprovalStepsInput>
  }

  export type ExpenseCreateNestedOneWithoutApprovalActionsInput = {
    create?: XOR<ExpenseCreateWithoutApprovalActionsInput, ExpenseUncheckedCreateWithoutApprovalActionsInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalActionsInput
    connect?: ExpenseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovalActionsInput = {
    create?: XOR<UserCreateWithoutApprovalActionsInput, UserUncheckedCreateWithoutApprovalActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovalActionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumApprovalActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ApprovalActionType
  }

  export type ExpenseUpdateOneRequiredWithoutApprovalActionsNestedInput = {
    create?: XOR<ExpenseCreateWithoutApprovalActionsInput, ExpenseUncheckedCreateWithoutApprovalActionsInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutApprovalActionsInput
    upsert?: ExpenseUpsertWithoutApprovalActionsInput
    connect?: ExpenseWhereUniqueInput
    update?: XOR<XOR<ExpenseUpdateToOneWithWhereWithoutApprovalActionsInput, ExpenseUpdateWithoutApprovalActionsInput>, ExpenseUncheckedUpdateWithoutApprovalActionsInput>
  }

  export type UserUpdateOneRequiredWithoutApprovalActionsNestedInput = {
    create?: XOR<UserCreateWithoutApprovalActionsInput, UserUncheckedCreateWithoutApprovalActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovalActionsInput
    upsert?: UserUpsertWithoutApprovalActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovalActionsInput, UserUpdateWithoutApprovalActionsInput>, UserUncheckedUpdateWithoutApprovalActionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumExpenseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseStatus | EnumExpenseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseStatusFilter<$PrismaModel> | $Enums.ExpenseStatus
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumExpenseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseStatus | EnumExpenseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseStatus[] | ListEnumExpenseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseStatusFilter<$PrismaModel>
    _max?: NestedEnumExpenseStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumApprovalRuleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalRuleType | EnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalRuleTypeFilter<$PrismaModel> | $Enums.ApprovalRuleType
  }

  export type NestedEnumApprovalRuleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalRuleType | EnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalRuleType[] | ListEnumApprovalRuleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalRuleTypeWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalRuleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalRuleTypeFilter<$PrismaModel>
    _max?: NestedEnumApprovalRuleTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumApprovalActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalActionType | EnumApprovalActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalActionTypeFilter<$PrismaModel> | $Enums.ApprovalActionType
  }

  export type NestedEnumApprovalActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalActionType | EnumApprovalActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApprovalActionType[] | ListEnumApprovalActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumApprovalActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalActionTypeFilter<$PrismaModel>
    _max?: NestedEnumApprovalActionTypeFilter<$PrismaModel>
  }

  export type CompanyCreateWithoutBaseCurrencyInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutBaseCurrencyInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutBaseCurrencyInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput>
  }

  export type CompanyCreateManyBaseCurrencyInputEnvelope = {
    data: CompanyCreateManyBaseCurrencyInput | CompanyCreateManyBaseCurrencyInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutCurrencyInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    submitter: UserCreateNestedOneWithoutExpensesInput
    approvalRule?: ApprovalRuleCreateNestedOneWithoutExpensesInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutCurrencyInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutCurrencyInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput>
  }

  export type ExpenseCreateManyCurrencyInputEnvelope = {
    data: ExpenseCreateManyCurrencyInput | ExpenseCreateManyCurrencyInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeRateCacheCreateWithoutFromCurrencyInput = {
    id?: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
  }

  export type ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput = {
    id?: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
  }

  export type ExchangeRateCacheCreateOrConnectWithoutFromCurrencyInput = {
    where: ExchangeRateCacheWhereUniqueInput
    create: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput>
  }

  export type ExchangeRateCacheCreateManyFromCurrencyInputEnvelope = {
    data: ExchangeRateCacheCreateManyFromCurrencyInput | ExchangeRateCacheCreateManyFromCurrencyInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithWhereUniqueWithoutBaseCurrencyInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutBaseCurrencyInput, CompanyUncheckedUpdateWithoutBaseCurrencyInput>
    create: XOR<CompanyCreateWithoutBaseCurrencyInput, CompanyUncheckedCreateWithoutBaseCurrencyInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutBaseCurrencyInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutBaseCurrencyInput, CompanyUncheckedUpdateWithoutBaseCurrencyInput>
  }

  export type CompanyUpdateManyWithWhereWithoutBaseCurrencyInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutBaseCurrencyInput>
  }

  export type CompanyScalarWhereInput = {
    AND?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    OR?: CompanyScalarWhereInput[]
    NOT?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    country?: StringFilter<"Company"> | string
    baseCurrencyId?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
  }

  export type ExpenseUpsertWithWhereUniqueWithoutCurrencyInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCurrencyInput, ExpenseUncheckedUpdateWithoutCurrencyInput>
    create: XOR<ExpenseCreateWithoutCurrencyInput, ExpenseUncheckedCreateWithoutCurrencyInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutCurrencyInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCurrencyInput, ExpenseUncheckedUpdateWithoutCurrencyInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutCurrencyInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutCurrencyInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: StringFilter<"Expense"> | string
    subject?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    totalAmount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    currencyId?: StringFilter<"Expense"> | string
    convertedAmount?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableFilter<"Expense"> | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus
    remarks?: StringNullableFilter<"Expense"> | string | null
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    categoryId?: StringFilter<"Expense"> | string
    submitterId?: StringFilter<"Expense"> | string
    approvalRuleId?: StringNullableFilter<"Expense"> | string | null
    currentStepOrder?: IntNullableFilter<"Expense"> | number | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    submittedAt?: DateTimeNullableFilter<"Expense"> | Date | string | null
  }

  export type ExchangeRateCacheUpsertWithWhereUniqueWithoutFromCurrencyInput = {
    where: ExchangeRateCacheWhereUniqueInput
    update: XOR<ExchangeRateCacheUpdateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedUpdateWithoutFromCurrencyInput>
    create: XOR<ExchangeRateCacheCreateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedCreateWithoutFromCurrencyInput>
  }

  export type ExchangeRateCacheUpdateWithWhereUniqueWithoutFromCurrencyInput = {
    where: ExchangeRateCacheWhereUniqueInput
    data: XOR<ExchangeRateCacheUpdateWithoutFromCurrencyInput, ExchangeRateCacheUncheckedUpdateWithoutFromCurrencyInput>
  }

  export type ExchangeRateCacheUpdateManyWithWhereWithoutFromCurrencyInput = {
    where: ExchangeRateCacheScalarWhereInput
    data: XOR<ExchangeRateCacheUpdateManyMutationInput, ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyInput>
  }

  export type ExchangeRateCacheScalarWhereInput = {
    AND?: ExchangeRateCacheScalarWhereInput | ExchangeRateCacheScalarWhereInput[]
    OR?: ExchangeRateCacheScalarWhereInput[]
    NOT?: ExchangeRateCacheScalarWhereInput | ExchangeRateCacheScalarWhereInput[]
    id?: StringFilter<"ExchangeRateCache"> | string
    fromCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    toCurrencyId?: StringFilter<"ExchangeRateCache"> | string
    rate?: DecimalFilter<"ExchangeRateCache"> | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
  }

  export type CurrencyCreateWithoutExchangeRatesFromInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyCreateNestedManyWithoutBaseCurrencyInput
    expenses?: ExpenseCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutExchangeRatesFromInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyUncheckedCreateNestedManyWithoutBaseCurrencyInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutExchangeRatesFromInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutExchangeRatesFromInput, CurrencyUncheckedCreateWithoutExchangeRatesFromInput>
  }

  export type CurrencyUpsertWithoutExchangeRatesFromInput = {
    update: XOR<CurrencyUpdateWithoutExchangeRatesFromInput, CurrencyUncheckedUpdateWithoutExchangeRatesFromInput>
    create: XOR<CurrencyCreateWithoutExchangeRatesFromInput, CurrencyUncheckedCreateWithoutExchangeRatesFromInput>
    where?: CurrencyWhereInput
  }

  export type CurrencyUpdateToOneWithWhereWithoutExchangeRatesFromInput = {
    where?: CurrencyWhereInput
    data: XOR<CurrencyUpdateWithoutExchangeRatesFromInput, CurrencyUncheckedUpdateWithoutExchangeRatesFromInput>
  }

  export type CurrencyUpdateWithoutExchangeRatesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUpdateManyWithoutBaseCurrencyNestedInput
    expenses?: ExpenseUpdateManyWithoutCurrencyNestedInput
  }

  export type CurrencyUncheckedUpdateWithoutExchangeRatesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUncheckedUpdateManyWithoutBaseCurrencyNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutCurrencyNestedInput
  }

  export type CurrencyCreateWithoutCompaniesInput = {
    id: string
    name: string
    symbol: string
    expenses?: ExpenseCreateNestedManyWithoutCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutCompaniesInput = {
    id: string
    name: string
    symbol: string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutCompaniesInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutCompaniesInput, CurrencyUncheckedCreateWithoutCompaniesInput>
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCategoryCreateWithoutCompanyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutCompanyInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput>
  }

  export type ExpenseCategoryCreateManyCompanyInputEnvelope = {
    data: ExpenseCategoryCreateManyCompanyInput | ExpenseCategoryCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ApprovalRuleCreateWithoutCompanyInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    specificApprover?: UserCreateNestedOneWithoutSpecificApproverForInput
    steps?: ApprovalStepCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: ApprovalStepUncheckedCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleCreateOrConnectWithoutCompanyInput = {
    where: ApprovalRuleWhereUniqueInput
    create: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput>
  }

  export type ApprovalRuleCreateManyCompanyInputEnvelope = {
    data: ApprovalRuleCreateManyCompanyInput | ApprovalRuleCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CurrencyUpsertWithoutCompaniesInput = {
    update: XOR<CurrencyUpdateWithoutCompaniesInput, CurrencyUncheckedUpdateWithoutCompaniesInput>
    create: XOR<CurrencyCreateWithoutCompaniesInput, CurrencyUncheckedCreateWithoutCompaniesInput>
    where?: CurrencyWhereInput
  }

  export type CurrencyUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: CurrencyWhereInput
    data: XOR<CurrencyUpdateWithoutCompaniesInput, CurrencyUncheckedUpdateWithoutCompaniesInput>
  }

  export type CurrencyUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    expenses?: ExpenseUpdateManyWithoutCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUpdateManyWithoutFromCurrencyNestedInput
  }

  export type CurrencyUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    expenses?: ExpenseUncheckedUpdateManyWithoutCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    designation?: StringNullableFilter<"User"> | string | null
    companyId?: StringNullableFilter<"User"> | string | null
    managerId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
  }

  export type ExpenseCategoryUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ExpenseCategoryWhereUniqueInput
    update: XOR<ExpenseCategoryUpdateWithoutCompanyInput, ExpenseCategoryUncheckedUpdateWithoutCompanyInput>
    create: XOR<ExpenseCategoryCreateWithoutCompanyInput, ExpenseCategoryUncheckedCreateWithoutCompanyInput>
  }

  export type ExpenseCategoryUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ExpenseCategoryWhereUniqueInput
    data: XOR<ExpenseCategoryUpdateWithoutCompanyInput, ExpenseCategoryUncheckedUpdateWithoutCompanyInput>
  }

  export type ExpenseCategoryUpdateManyWithWhereWithoutCompanyInput = {
    where: ExpenseCategoryScalarWhereInput
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ExpenseCategoryScalarWhereInput = {
    AND?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
    OR?: ExpenseCategoryScalarWhereInput[]
    NOT?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
    id?: StringFilter<"ExpenseCategory"> | string
    name?: StringFilter<"ExpenseCategory"> | string
    description?: StringNullableFilter<"ExpenseCategory"> | string | null
    companyId?: StringFilter<"ExpenseCategory"> | string
    isActive?: BoolFilter<"ExpenseCategory"> | boolean
  }

  export type ApprovalRuleUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ApprovalRuleWhereUniqueInput
    update: XOR<ApprovalRuleUpdateWithoutCompanyInput, ApprovalRuleUncheckedUpdateWithoutCompanyInput>
    create: XOR<ApprovalRuleCreateWithoutCompanyInput, ApprovalRuleUncheckedCreateWithoutCompanyInput>
  }

  export type ApprovalRuleUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ApprovalRuleWhereUniqueInput
    data: XOR<ApprovalRuleUpdateWithoutCompanyInput, ApprovalRuleUncheckedUpdateWithoutCompanyInput>
  }

  export type ApprovalRuleUpdateManyWithWhereWithoutCompanyInput = {
    where: ApprovalRuleScalarWhereInput
    data: XOR<ApprovalRuleUpdateManyMutationInput, ApprovalRuleUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ApprovalRuleScalarWhereInput = {
    AND?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
    OR?: ApprovalRuleScalarWhereInput[]
    NOT?: ApprovalRuleScalarWhereInput | ApprovalRuleScalarWhereInput[]
    id?: StringFilter<"ApprovalRule"> | string
    name?: StringFilter<"ApprovalRule"> | string
    companyId?: StringFilter<"ApprovalRule"> | string
    ruleType?: EnumApprovalRuleTypeFilter<"ApprovalRule"> | $Enums.ApprovalRuleType
    requiredPercent?: IntNullableFilter<"ApprovalRule"> | number | null
    specificApproverId?: StringNullableFilter<"ApprovalRule"> | string | null
    isManagerFirst?: BoolFilter<"ApprovalRule"> | boolean
    isDefault?: BoolFilter<"ApprovalRule"> | boolean
    isActive?: BoolFilter<"ApprovalRule"> | boolean
    createdAt?: DateTimeFilter<"ApprovalRule"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRule"> | Date | string
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    baseCurrency: CurrencyCreateNestedOneWithoutCompaniesInput
    categories?: ExpenseCategoryCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutSubordinatesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutSubordinatesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutSubordinatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
  }

  export type UserCreateWithoutManagerInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutManagerInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutManagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
  }

  export type UserCreateManyManagerInputEnvelope = {
    data: UserCreateManyManagerInput | UserCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutSubmitterInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    currency: CurrencyCreateNestedOneWithoutExpensesInput
    approvalRule?: ApprovalRuleCreateNestedOneWithoutExpensesInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutSubmitterInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutSubmitterInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput>
  }

  export type ExpenseCreateManySubmitterInputEnvelope = {
    data: ExpenseCreateManySubmitterInput | ExpenseCreateManySubmitterInput[]
    skipDuplicates?: boolean
  }

  export type ApprovalActionCreateWithoutApproverInput = {
    id?: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
    expense: ExpenseCreateNestedOneWithoutApprovalActionsInput
  }

  export type ApprovalActionUncheckedCreateWithoutApproverInput = {
    id?: string
    expenseId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalActionCreateOrConnectWithoutApproverInput = {
    where: ApprovalActionWhereUniqueInput
    create: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput>
  }

  export type ApprovalActionCreateManyApproverInputEnvelope = {
    data: ApprovalActionCreateManyApproverInput | ApprovalActionCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type ApprovalStepCreateWithoutApproverInput = {
    id?: string
    stepOrder: number
    approvalRule: ApprovalRuleCreateNestedOneWithoutStepsInput
  }

  export type ApprovalStepUncheckedCreateWithoutApproverInput = {
    id?: string
    approvalRuleId: string
    stepOrder: number
  }

  export type ApprovalStepCreateOrConnectWithoutApproverInput = {
    where: ApprovalStepWhereUniqueInput
    create: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput>
  }

  export type ApprovalStepCreateManyApproverInputEnvelope = {
    data: ApprovalStepCreateManyApproverInput | ApprovalStepCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type ApprovalRuleCreateWithoutSpecificApproverInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutApprovalRulesInput
    steps?: ApprovalStepCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUncheckedCreateWithoutSpecificApproverInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: ApprovalStepUncheckedCreateNestedManyWithoutApprovalRuleInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleCreateOrConnectWithoutSpecificApproverInput = {
    where: ApprovalRuleWhereUniqueInput
    create: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput>
  }

  export type ApprovalRuleCreateManySpecificApproverInputEnvelope = {
    data: ApprovalRuleCreateManySpecificApproverInput | ApprovalRuleCreateManySpecificApproverInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseCurrency?: CurrencyUpdateOneRequiredWithoutCompaniesNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    baseCurrencyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserUpsertWithoutSubordinatesInput = {
    update: XOR<UserUpdateWithoutSubordinatesInput, UserUncheckedUpdateWithoutSubordinatesInput>
    create: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubordinatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubordinatesInput, UserUncheckedUpdateWithoutSubordinatesInput>
  }

  export type UserUpdateWithoutSubordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutSubordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
  }

  export type UserUpdateManyWithWhereWithoutManagerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutManagerInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type ExpenseUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutSubmitterInput, ExpenseUncheckedUpdateWithoutSubmitterInput>
    create: XOR<ExpenseCreateWithoutSubmitterInput, ExpenseUncheckedCreateWithoutSubmitterInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutSubmitterInput, ExpenseUncheckedUpdateWithoutSubmitterInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutSubmitterInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutSubmitterInput>
  }

  export type ApprovalActionUpsertWithWhereUniqueWithoutApproverInput = {
    where: ApprovalActionWhereUniqueInput
    update: XOR<ApprovalActionUpdateWithoutApproverInput, ApprovalActionUncheckedUpdateWithoutApproverInput>
    create: XOR<ApprovalActionCreateWithoutApproverInput, ApprovalActionUncheckedCreateWithoutApproverInput>
  }

  export type ApprovalActionUpdateWithWhereUniqueWithoutApproverInput = {
    where: ApprovalActionWhereUniqueInput
    data: XOR<ApprovalActionUpdateWithoutApproverInput, ApprovalActionUncheckedUpdateWithoutApproverInput>
  }

  export type ApprovalActionUpdateManyWithWhereWithoutApproverInput = {
    where: ApprovalActionScalarWhereInput
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyWithoutApproverInput>
  }

  export type ApprovalActionScalarWhereInput = {
    AND?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
    OR?: ApprovalActionScalarWhereInput[]
    NOT?: ApprovalActionScalarWhereInput | ApprovalActionScalarWhereInput[]
    id?: StringFilter<"ApprovalAction"> | string
    expenseId?: StringFilter<"ApprovalAction"> | string
    approverId?: StringFilter<"ApprovalAction"> | string
    action?: EnumApprovalActionTypeFilter<"ApprovalAction"> | $Enums.ApprovalActionType
    comment?: StringNullableFilter<"ApprovalAction"> | string | null
    stepOrder?: IntFilter<"ApprovalAction"> | number
    createdAt?: DateTimeFilter<"ApprovalAction"> | Date | string
  }

  export type ApprovalStepUpsertWithWhereUniqueWithoutApproverInput = {
    where: ApprovalStepWhereUniqueInput
    update: XOR<ApprovalStepUpdateWithoutApproverInput, ApprovalStepUncheckedUpdateWithoutApproverInput>
    create: XOR<ApprovalStepCreateWithoutApproverInput, ApprovalStepUncheckedCreateWithoutApproverInput>
  }

  export type ApprovalStepUpdateWithWhereUniqueWithoutApproverInput = {
    where: ApprovalStepWhereUniqueInput
    data: XOR<ApprovalStepUpdateWithoutApproverInput, ApprovalStepUncheckedUpdateWithoutApproverInput>
  }

  export type ApprovalStepUpdateManyWithWhereWithoutApproverInput = {
    where: ApprovalStepScalarWhereInput
    data: XOR<ApprovalStepUpdateManyMutationInput, ApprovalStepUncheckedUpdateManyWithoutApproverInput>
  }

  export type ApprovalStepScalarWhereInput = {
    AND?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
    OR?: ApprovalStepScalarWhereInput[]
    NOT?: ApprovalStepScalarWhereInput | ApprovalStepScalarWhereInput[]
    id?: StringFilter<"ApprovalStep"> | string
    approvalRuleId?: StringFilter<"ApprovalStep"> | string
    approverId?: StringFilter<"ApprovalStep"> | string
    stepOrder?: IntFilter<"ApprovalStep"> | number
  }

  export type ApprovalRuleUpsertWithWhereUniqueWithoutSpecificApproverInput = {
    where: ApprovalRuleWhereUniqueInput
    update: XOR<ApprovalRuleUpdateWithoutSpecificApproverInput, ApprovalRuleUncheckedUpdateWithoutSpecificApproverInput>
    create: XOR<ApprovalRuleCreateWithoutSpecificApproverInput, ApprovalRuleUncheckedCreateWithoutSpecificApproverInput>
  }

  export type ApprovalRuleUpdateWithWhereUniqueWithoutSpecificApproverInput = {
    where: ApprovalRuleWhereUniqueInput
    data: XOR<ApprovalRuleUpdateWithoutSpecificApproverInput, ApprovalRuleUncheckedUpdateWithoutSpecificApproverInput>
  }

  export type ApprovalRuleUpdateManyWithWhereWithoutSpecificApproverInput = {
    where: ApprovalRuleScalarWhereInput
    data: XOR<ApprovalRuleUpdateManyMutationInput, ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverInput>
  }

  export type CompanyCreateWithoutCategoriesInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    baseCurrency: CurrencyCreateNestedOneWithoutCompaniesInput
    users?: UserCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    approvalRules?: ApprovalRuleUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCategoriesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
  }

  export type ExpenseCreateWithoutCategoryInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    submitter: UserCreateNestedOneWithoutExpensesInput
    currency: CurrencyCreateNestedOneWithoutExpensesInput
    approvalRule?: ApprovalRuleCreateNestedOneWithoutExpensesInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseCreateManyCategoryInputEnvelope = {
    data: ExpenseCreateManyCategoryInput | ExpenseCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutCategoriesInput = {
    update: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type CompanyUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseCurrency?: CurrencyUpdateOneRequiredWithoutCompaniesNestedInput
    users?: UserUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    baseCurrencyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ExpenseCategoryCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    company: CompanyCreateNestedOneWithoutCategoriesInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    companyId: string
    isActive?: boolean
  }

  export type ExpenseCategoryCreateOrConnectWithoutExpensesInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
  }

  export type UserCreateWithoutExpensesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutExpensesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  export type CurrencyCreateWithoutExpensesInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyCreateNestedManyWithoutBaseCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutExpensesInput = {
    id: string
    name: string
    symbol: string
    companies?: CompanyUncheckedCreateNestedManyWithoutBaseCurrencyInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedCreateNestedManyWithoutFromCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutExpensesInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutExpensesInput, CurrencyUncheckedCreateWithoutExpensesInput>
  }

  export type ApprovalRuleCreateWithoutExpensesInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutApprovalRulesInput
    specificApprover?: UserCreateNestedOneWithoutSpecificApproverForInput
    steps?: ApprovalStepCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: ApprovalStepUncheckedCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleCreateOrConnectWithoutExpensesInput = {
    where: ApprovalRuleWhereUniqueInput
    create: XOR<ApprovalRuleCreateWithoutExpensesInput, ApprovalRuleUncheckedCreateWithoutExpensesInput>
  }

  export type ApprovalActionCreateWithoutExpenseInput = {
    id?: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
    approver: UserCreateNestedOneWithoutApprovalActionsInput
  }

  export type ApprovalActionUncheckedCreateWithoutExpenseInput = {
    id?: string
    approverId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalActionCreateOrConnectWithoutExpenseInput = {
    where: ApprovalActionWhereUniqueInput
    create: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput>
  }

  export type ApprovalActionCreateManyExpenseInputEnvelope = {
    data: ApprovalActionCreateManyExpenseInput | ApprovalActionCreateManyExpenseInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCategoryUpsertWithoutExpensesInput = {
    update: XOR<ExpenseCategoryUpdateWithoutExpensesInput, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
    create: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    where?: ExpenseCategoryWhereInput
  }

  export type ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInput = {
    where?: ExpenseCategoryWhereInput
    data: XOR<ExpenseCategoryUpdateWithoutExpensesInput, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type ExpenseCategoryUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUpsertWithoutExpensesInput = {
    update: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type CurrencyUpsertWithoutExpensesInput = {
    update: XOR<CurrencyUpdateWithoutExpensesInput, CurrencyUncheckedUpdateWithoutExpensesInput>
    create: XOR<CurrencyCreateWithoutExpensesInput, CurrencyUncheckedCreateWithoutExpensesInput>
    where?: CurrencyWhereInput
  }

  export type CurrencyUpdateToOneWithWhereWithoutExpensesInput = {
    where?: CurrencyWhereInput
    data: XOR<CurrencyUpdateWithoutExpensesInput, CurrencyUncheckedUpdateWithoutExpensesInput>
  }

  export type CurrencyUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUpdateManyWithoutBaseCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUpdateManyWithoutFromCurrencyNestedInput
  }

  export type CurrencyUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUncheckedUpdateManyWithoutBaseCurrencyNestedInput
    exchangeRatesFrom?: ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyNestedInput
  }

  export type ApprovalRuleUpsertWithoutExpensesInput = {
    update: XOR<ApprovalRuleUpdateWithoutExpensesInput, ApprovalRuleUncheckedUpdateWithoutExpensesInput>
    create: XOR<ApprovalRuleCreateWithoutExpensesInput, ApprovalRuleUncheckedCreateWithoutExpensesInput>
    where?: ApprovalRuleWhereInput
  }

  export type ApprovalRuleUpdateToOneWithWhereWithoutExpensesInput = {
    where?: ApprovalRuleWhereInput
    data: XOR<ApprovalRuleUpdateWithoutExpensesInput, ApprovalRuleUncheckedUpdateWithoutExpensesInput>
  }

  export type ApprovalRuleUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApprovalRulesNestedInput
    specificApprover?: UserUpdateOneWithoutSpecificApproverForNestedInput
    steps?: ApprovalStepUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: ApprovalStepUncheckedUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalActionUpsertWithWhereUniqueWithoutExpenseInput = {
    where: ApprovalActionWhereUniqueInput
    update: XOR<ApprovalActionUpdateWithoutExpenseInput, ApprovalActionUncheckedUpdateWithoutExpenseInput>
    create: XOR<ApprovalActionCreateWithoutExpenseInput, ApprovalActionUncheckedCreateWithoutExpenseInput>
  }

  export type ApprovalActionUpdateWithWhereUniqueWithoutExpenseInput = {
    where: ApprovalActionWhereUniqueInput
    data: XOR<ApprovalActionUpdateWithoutExpenseInput, ApprovalActionUncheckedUpdateWithoutExpenseInput>
  }

  export type ApprovalActionUpdateManyWithWhereWithoutExpenseInput = {
    where: ApprovalActionScalarWhereInput
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyWithoutExpenseInput>
  }

  export type CompanyCreateWithoutApprovalRulesInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    baseCurrency: CurrencyCreateNestedOneWithoutCompaniesInput
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutApprovalRulesInput = {
    id?: string
    name: string
    country: string
    baseCurrencyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutApprovalRulesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutApprovalRulesInput, CompanyUncheckedCreateWithoutApprovalRulesInput>
  }

  export type UserCreateWithoutSpecificApproverForInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutSpecificApproverForInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutSpecificApproverForInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSpecificApproverForInput, UserUncheckedCreateWithoutSpecificApproverForInput>
  }

  export type ApprovalStepCreateWithoutApprovalRuleInput = {
    id?: string
    stepOrder: number
    approver: UserCreateNestedOneWithoutApprovalStepsInput
  }

  export type ApprovalStepUncheckedCreateWithoutApprovalRuleInput = {
    id?: string
    approverId: string
    stepOrder: number
  }

  export type ApprovalStepCreateOrConnectWithoutApprovalRuleInput = {
    where: ApprovalStepWhereUniqueInput
    create: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput>
  }

  export type ApprovalStepCreateManyApprovalRuleInputEnvelope = {
    data: ApprovalStepCreateManyApprovalRuleInput | ApprovalStepCreateManyApprovalRuleInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutApprovalRuleInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    submitter: UserCreateNestedOneWithoutExpensesInput
    currency: CurrencyCreateNestedOneWithoutExpensesInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutApprovalRuleInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutApprovalRuleInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput>
  }

  export type ExpenseCreateManyApprovalRuleInputEnvelope = {
    data: ExpenseCreateManyApprovalRuleInput | ExpenseCreateManyApprovalRuleInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutApprovalRulesInput = {
    update: XOR<CompanyUpdateWithoutApprovalRulesInput, CompanyUncheckedUpdateWithoutApprovalRulesInput>
    create: XOR<CompanyCreateWithoutApprovalRulesInput, CompanyUncheckedCreateWithoutApprovalRulesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutApprovalRulesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutApprovalRulesInput, CompanyUncheckedUpdateWithoutApprovalRulesInput>
  }

  export type CompanyUpdateWithoutApprovalRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseCurrency?: CurrencyUpdateOneRequiredWithoutCompaniesNestedInput
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutApprovalRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    baseCurrencyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserUpsertWithoutSpecificApproverForInput = {
    update: XOR<UserUpdateWithoutSpecificApproverForInput, UserUncheckedUpdateWithoutSpecificApproverForInput>
    create: XOR<UserCreateWithoutSpecificApproverForInput, UserUncheckedCreateWithoutSpecificApproverForInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSpecificApproverForInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSpecificApproverForInput, UserUncheckedUpdateWithoutSpecificApproverForInput>
  }

  export type UserUpdateWithoutSpecificApproverForInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutSpecificApproverForInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ApprovalStepUpsertWithWhereUniqueWithoutApprovalRuleInput = {
    where: ApprovalStepWhereUniqueInput
    update: XOR<ApprovalStepUpdateWithoutApprovalRuleInput, ApprovalStepUncheckedUpdateWithoutApprovalRuleInput>
    create: XOR<ApprovalStepCreateWithoutApprovalRuleInput, ApprovalStepUncheckedCreateWithoutApprovalRuleInput>
  }

  export type ApprovalStepUpdateWithWhereUniqueWithoutApprovalRuleInput = {
    where: ApprovalStepWhereUniqueInput
    data: XOR<ApprovalStepUpdateWithoutApprovalRuleInput, ApprovalStepUncheckedUpdateWithoutApprovalRuleInput>
  }

  export type ApprovalStepUpdateManyWithWhereWithoutApprovalRuleInput = {
    where: ApprovalStepScalarWhereInput
    data: XOR<ApprovalStepUpdateManyMutationInput, ApprovalStepUncheckedUpdateManyWithoutApprovalRuleInput>
  }

  export type ExpenseUpsertWithWhereUniqueWithoutApprovalRuleInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutApprovalRuleInput, ExpenseUncheckedUpdateWithoutApprovalRuleInput>
    create: XOR<ExpenseCreateWithoutApprovalRuleInput, ExpenseUncheckedCreateWithoutApprovalRuleInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutApprovalRuleInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutApprovalRuleInput, ExpenseUncheckedUpdateWithoutApprovalRuleInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutApprovalRuleInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutApprovalRuleInput>
  }

  export type ApprovalRuleCreateWithoutStepsInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutApprovalRulesInput
    specificApprover?: UserCreateNestedOneWithoutSpecificApproverForInput
    expenses?: ExpenseCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleUncheckedCreateWithoutStepsInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutApprovalRuleInput
  }

  export type ApprovalRuleCreateOrConnectWithoutStepsInput = {
    where: ApprovalRuleWhereUniqueInput
    create: XOR<ApprovalRuleCreateWithoutStepsInput, ApprovalRuleUncheckedCreateWithoutStepsInput>
  }

  export type UserCreateWithoutApprovalStepsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutApprovalStepsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutApprovalStepsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovalStepsInput, UserUncheckedCreateWithoutApprovalStepsInput>
  }

  export type ApprovalRuleUpsertWithoutStepsInput = {
    update: XOR<ApprovalRuleUpdateWithoutStepsInput, ApprovalRuleUncheckedUpdateWithoutStepsInput>
    create: XOR<ApprovalRuleCreateWithoutStepsInput, ApprovalRuleUncheckedCreateWithoutStepsInput>
    where?: ApprovalRuleWhereInput
  }

  export type ApprovalRuleUpdateToOneWithWhereWithoutStepsInput = {
    where?: ApprovalRuleWhereInput
    data: XOR<ApprovalRuleUpdateWithoutStepsInput, ApprovalRuleUncheckedUpdateWithoutStepsInput>
  }

  export type ApprovalRuleUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApprovalRulesNestedInput
    specificApprover?: UserUpdateOneWithoutSpecificApproverForNestedInput
    expenses?: ExpenseUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutApprovalRuleNestedInput
  }

  export type UserUpsertWithoutApprovalStepsInput = {
    update: XOR<UserUpdateWithoutApprovalStepsInput, UserUncheckedUpdateWithoutApprovalStepsInput>
    create: XOR<UserCreateWithoutApprovalStepsInput, UserUncheckedCreateWithoutApprovalStepsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovalStepsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovalStepsInput, UserUncheckedUpdateWithoutApprovalStepsInput>
  }

  export type UserUpdateWithoutApprovalStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovalStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type ExpenseCreateWithoutApprovalActionsInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    submitter: UserCreateNestedOneWithoutExpensesInput
    currency: CurrencyCreateNestedOneWithoutExpensesInput
    approvalRule?: ApprovalRuleCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutApprovalActionsInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ExpenseCreateOrConnectWithoutApprovalActionsInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutApprovalActionsInput, ExpenseUncheckedCreateWithoutApprovalActionsInput>
  }

  export type UserCreateWithoutApprovalActionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutApprovalActionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutApprovalActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovalActionsInput, UserUncheckedCreateWithoutApprovalActionsInput>
  }

  export type ExpenseUpsertWithoutApprovalActionsInput = {
    update: XOR<ExpenseUpdateWithoutApprovalActionsInput, ExpenseUncheckedUpdateWithoutApprovalActionsInput>
    create: XOR<ExpenseCreateWithoutApprovalActionsInput, ExpenseUncheckedCreateWithoutApprovalActionsInput>
    where?: ExpenseWhereInput
  }

  export type ExpenseUpdateToOneWithWhereWithoutApprovalActionsInput = {
    where?: ExpenseWhereInput
    data: XOR<ExpenseUpdateWithoutApprovalActionsInput, ExpenseUncheckedUpdateWithoutApprovalActionsInput>
  }

  export type ExpenseUpdateWithoutApprovalActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    submitter?: UserUpdateOneRequiredWithoutExpensesNestedInput
    currency?: CurrencyUpdateOneRequiredWithoutExpensesNestedInput
    approvalRule?: ApprovalRuleUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutApprovalActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutApprovalActionsInput = {
    update: XOR<UserUpdateWithoutApprovalActionsInput, UserUncheckedUpdateWithoutApprovalActionsInput>
    create: XOR<UserCreateWithoutApprovalActionsInput, UserUncheckedCreateWithoutApprovalActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovalActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovalActionsInput, UserUncheckedUpdateWithoutApprovalActionsInput>
  }

  export type UserUpdateWithoutApprovalActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovalActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    isActive?: boolean
    company?: CompanyCreateNestedOneWithoutUsersInput
    manager?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutManagerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    managerId?: string | null
    isActive?: boolean
    subordinates?: UserUncheckedCreateNestedManyWithoutManagerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutSubmitterInput
    approvalActions?: ApprovalActionUncheckedCreateNestedManyWithoutApproverInput
    approvalSteps?: ApprovalStepUncheckedCreateNestedManyWithoutApproverInput
    specificApproverFor?: ApprovalRuleUncheckedCreateNestedManyWithoutSpecificApproverInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type CompanyCreateManyBaseCurrencyInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateManyCurrencyInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ExchangeRateCacheCreateManyFromCurrencyInput = {
    id?: string
    toCurrencyId: string
    rate: Decimal | DecimalJsLike | number | string
    fetchedAt?: Date | string
  }

  export type CompanyUpdateWithoutBaseCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutBaseCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutCompanyNestedInput
    approvalRules?: ApprovalRuleUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutBaseCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    submitter?: UserUpdateOneRequiredWithoutExpensesNestedInput
    approvalRule?: ApprovalRuleUpdateOneWithoutExpensesNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateManyWithoutCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExchangeRateCacheUpdateWithoutFromCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheUncheckedUpdateWithoutFromCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheUncheckedUpdateManyWithoutFromCurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    toCurrencyId?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    managerId?: string | null
    isActive?: boolean
  }

  export type ExpenseCategoryCreateManyCompanyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type ApprovalRuleCreateManyCompanyInput = {
    id?: string
    name: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    specificApproverId?: string | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    manager?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExpenseCategoryUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApprovalRuleUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specificApprover?: UserUpdateOneWithoutSpecificApproverForNestedInput
    steps?: ApprovalStepUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: ApprovalStepUncheckedUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    specificApproverId?: NullableStringFieldUpdateOperationsInput | string | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyManagerInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    designation?: string | null
    companyId?: string | null
    isActive?: boolean
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type ExpenseCreateManySubmitterInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ApprovalActionCreateManyApproverInput = {
    id?: string
    expenseId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalStepCreateManyApproverInput = {
    id?: string
    approvalRuleId: string
    stepOrder: number
  }

  export type ApprovalRuleCreateManySpecificApproverInput = {
    id?: string
    name: string
    companyId: string
    ruleType?: $Enums.ApprovalRuleType
    requiredPercent?: number | null
    isManagerFirst?: boolean
    isDefault?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutUsersNestedInput
    subordinates?: UserUpdateManyWithoutManagerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: UserUncheckedUpdateManyWithoutManagerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutSubmitterNestedInput
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutApproverNestedInput
    approvalSteps?: ApprovalStepUncheckedUpdateManyWithoutApproverNestedInput
    specificApproverFor?: ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    currency?: CurrencyUpdateOneRequiredWithoutExpensesNestedInput
    approvalRule?: ApprovalRuleUpdateOneWithoutExpensesNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateManyWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApprovalActionUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expense?: ExpenseUpdateOneRequiredWithoutApprovalActionsNestedInput
  }

  export type ApprovalActionUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    expenseId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalActionUncheckedUpdateManyWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    expenseId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalStepUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
    approvalRule?: ApprovalRuleUpdateOneRequiredWithoutStepsNestedInput
  }

  export type ApprovalStepUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalStepUncheckedUpdateManyWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalRuleUpdateWithoutSpecificApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApprovalRulesNestedInput
    steps?: ApprovalStepUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateWithoutSpecificApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: ApprovalStepUncheckedUpdateManyWithoutApprovalRuleNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutApprovalRuleNestedInput
  }

  export type ApprovalRuleUncheckedUpdateManyWithoutSpecificApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ruleType?: EnumApprovalRuleTypeFieldUpdateOperationsInput | $Enums.ApprovalRuleType
    requiredPercent?: NullableIntFieldUpdateOperationsInput | number | null
    isManagerFirst?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyCategoryInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    submitterId: string
    approvalRuleId?: string | null
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ExpenseUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitter?: UserUpdateOneRequiredWithoutExpensesNestedInput
    currency?: CurrencyUpdateOneRequiredWithoutExpensesNestedInput
    approvalRule?: ApprovalRuleUpdateOneWithoutExpensesNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitterId?: StringFieldUpdateOperationsInput | string
    approvalRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApprovalActionCreateManyExpenseInput = {
    id?: string
    approverId: string
    action: $Enums.ApprovalActionType
    comment?: string | null
    stepOrder: number
    createdAt?: Date | string
  }

  export type ApprovalActionUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approver?: UserUpdateOneRequiredWithoutApprovalActionsNestedInput
  }

  export type ApprovalActionUncheckedUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalActionUncheckedUpdateManyWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    action?: EnumApprovalActionTypeFieldUpdateOperationsInput | $Enums.ApprovalActionType
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    stepOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalStepCreateManyApprovalRuleInput = {
    id?: string
    approverId: string
    stepOrder: number
  }

  export type ExpenseCreateManyApprovalRuleInput = {
    id?: string
    subject: string
    description?: string | null
    expenseDate: Date | string
    totalAmount: Decimal | DecimalJsLike | number | string
    currencyId: string
    convertedAmount?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    status?: $Enums.ExpenseStatus
    remarks?: string | null
    receiptUrl?: string | null
    categoryId: string
    submitterId: string
    currentStepOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedAt?: Date | string | null
  }

  export type ApprovalStepUpdateWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
    approver?: UserUpdateOneRequiredWithoutApprovalStepsNestedInput
  }

  export type ApprovalStepUncheckedUpdateWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ApprovalStepUncheckedUpdateManyWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    stepOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ExpenseUpdateWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    submitter?: UserUpdateOneRequiredWithoutExpensesNestedInput
    currency?: CurrencyUpdateOneRequiredWithoutExpensesNestedInput
    approvalActions?: ApprovalActionUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalActions?: ApprovalActionUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateManyWithoutApprovalRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currencyId?: StringFieldUpdateOperationsInput | string
    convertedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    submitterId?: StringFieldUpdateOperationsInput | string
    currentStepOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}