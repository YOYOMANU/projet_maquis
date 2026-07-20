import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.create': { paramsTuple?: []; params?: {} }
    'tags.store': { paramsTuple?: []; params?: {} }
    'tags.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.index': { paramsTuple?: []; params?: {} }
    'quartier.create': { paramsTuple?: []; params?: {} }
    'quartier.store': { paramsTuple?: []; params?: {} }
    'quartier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'security.edit': { paramsTuple?: []; params?: {} }
    'appearence.edit': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.create': { paramsTuple?: []; params?: {} }
    'tags.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.index': { paramsTuple?: []; params?: {} }
    'quartier.create': { paramsTuple?: []; params?: {} }
    'quartier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'security.edit': { paramsTuple?: []; params?: {} }
    'appearence.edit': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.create': { paramsTuple?: []; params?: {} }
    'tags.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.index': { paramsTuple?: []; params?: {} }
    'quartier.create': { paramsTuple?: []; params?: {} }
    'quartier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'security.edit': { paramsTuple?: []; params?: {} }
    'appearence.edit': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'tags.store': { paramsTuple?: []; params?: {} }
    'quartier.store': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'logout': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quartier.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}