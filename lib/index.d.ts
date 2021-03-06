import * as fastify from "fastify";
import * as http from "http";
import {
  OpenAPIObject,
  InfoObject,
  ExternalDocumentationObject,
  SchemasObject,
  SecurityRequirementObject,
  ComponentsObject,
  Server,
  TagObject
} from "openapi3-ts";
import { RegisterOptions } from "fastify";
import { ExternalDocs, Info, Security, Tag } from "swagger-schema-official";

declare module "fastify" {
  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    /**
     * Init OpenApi plugin
     */
    oas(): Promise<void>;
  }

  interface RouteSchema {
    /**
     * Hides route from result OpenAPI document
     * @default false
     */
    hide?: boolean;
    /**
     * Route description
     */
    description?: string;
    /**
     * Route summary
     */
    summary?: string;
    /**
     * Route tags
     */
    tags?: Array<string>;
    /**
     * Media types route consumes
     */
    consumes?: Array<string>;
    /**
     * Media types route produces
     */
    produces?: Array<string>;
    /**
     * OpenAPI security definitions
     */
    security?: Array<SecurityRequirementObject>;
    /**
     * OpenAPI operation unique identifier
     */
    operationId?: string;
  }
}

declare namespace fastifyOAS {
  export interface OpenApiSpec {
    info?: InfoObject | Info;
    externalDocs?: ExternalDocumentationObject | ExternalDocs;
    host?: string;
    basePath?: string;
    "x-tagGroups"?: string;
    schemes?: SchemasObject | Array<string>;
    consumes?: Array<string>;
    produces?: Array<string>;
    security?:
      | Array<SecurityRequirementObject>
      | Array<{ [securityDefinitionName: string]: Array<string> }>;
    servers?: Array<Server>;
    components?: ComponentsObject;
    securityDefinitions?: {
      [securityDefinitionName: string]: Security;
    };
    tags?: Array<TagObject> | Array<Tag>;
  }

  /**
   * Fastify OAS plugin options
   */
  export interface FastifyOASOptions
    extends RegisterOptions<
      http.Server,
      http.IncomingMessage,
      http.ServerResponse
    > {
    /**
     * Documentation endpoint
     * @default /documentation
     */
    routePrefix?: string;
    /**
     * If `true` the plugin will expose the documentation routes
     * @default false
     */
    exposeRoute?: boolean;
    /**
     * If `true` adds fastify schemas as openapi models
     * @default false
     */
    addModels?: boolean;
    /**
     * Openapi version
     * @default 3.0.0
     */
    openapi?: string;
    /**
     * If `true` returns yaml instead of json
     * @default false
     */
    yaml?: boolean;
    /**
     * OpenApi/Swagger object except paths
     */
    swagger?: OpenApiSpec;
    /**
     * If true will not add routes without tags
     * @default false
     */
    hideUntagged?: boolean;
  }
}

declare function fastifyOAS(): void;

export = fastifyOAS;
