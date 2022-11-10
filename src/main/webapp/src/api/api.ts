/* tslint:disable */
/* eslint-disable */
/**
 * dicoop API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.9.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Committee
 */
export interface Committee {
    /**
     * 
     * @type {string}
     * @memberof Committee
     */
    id?: string;
    /**
     * 
     * @type {Person}
     * @memberof Committee
     */
    evaluatedPerson?: Person;
    /**
     * 
     * @type {string}
     * @memberof Committee
     */
    createdDate?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Committee
     */
    useAvailability?: boolean;
    /**
     * 
     * @type {Settings}
     * @memberof Committee
     */
    settings?: Settings;
}
/**
 * 
 * @export
 * @interface CommitteeAssignment
 */
export interface CommitteeAssignment {
    /**
     * 
     * @type {number}
     * @memberof CommitteeAssignment
     */
    id?: number;
    /**
     * 
     * @type {Person}
     * @memberof CommitteeAssignment
     */
    assignedPerson?: Person;
    /**
     * 
     * @type {Committee}
     * @memberof CommitteeAssignment
     */
    committee?: Committee;
    /**
     * 
     * @type {PersonType}
     * @memberof CommitteeAssignment
     */
    requiredPersonType?: PersonType;
}
/**
 * 
 * @export
 * @interface CommitteeSolution
 */
export interface CommitteeSolution {
    /**
     * 
     * @type {string}
     * @memberof CommitteeSolution
     */
    id?: string;
    /**
     * 
     * @type {Array<CommitteeAssignment>}
     * @memberof CommitteeSolution
     */
    committeeAssignments?: Array<CommitteeAssignment>;
    /**
     * 
     * @type {HardMediumSoftScore}
     * @memberof CommitteeSolution
     */
    score?: HardMediumSoftScore;
    /**
     * 
     * @type {string}
     * @memberof CommitteeSolution
     */
    scoreExplanation?: string;
    /**
     * 
     * @type {SolverStatus}
     * @memberof CommitteeSolution
     */
    solverStatus?: SolverStatus;
}
/**
 * 
 * @export
 * @interface DistanceMatrix
 */
export interface DistanceMatrix {
    /**
     * 
     * @type {Array<string>}
     * @memberof DistanceMatrix
     */
    locations?: Array<string>;
    /**
     * 
     * @type {Array<Array<number>>}
     * @memberof DistanceMatrix
     */
    distances?: Array<Array<number>>;
}
/**
 * 
 * @export
 * @interface HardMediumSoftScore
 */
export interface HardMediumSoftScore {
    /**
     * 
     * @type {boolean}
     * @memberof HardMediumSoftScore
     */
    zero?: boolean;
    /**
     * 
     * @type {number}
     * @memberof HardMediumSoftScore
     */
    initScore?: number;
    /**
     * 
     * @type {boolean}
     * @memberof HardMediumSoftScore
     */
    solutionInitialized?: boolean;
    /**
     * 
     * @type {string}
     * @memberof HardMediumSoftScore
     */
    initPrefix?: string;
    /**
     * 
     * @type {number}
     * @memberof HardMediumSoftScore
     */
    hardScore?: number;
    /**
     * 
     * @type {number}
     * @memberof HardMediumSoftScore
     */
    mediumScore?: number;
    /**
     * 
     * @type {number}
     * @memberof HardMediumSoftScore
     */
    softScore?: number;
    /**
     * 
     * @type {boolean}
     * @memberof HardMediumSoftScore
     */
    feasible?: boolean;
}
/**
 * 
 * @export
 * @interface Location
 */
export interface Location {
    /**
     * 
     * @type {string}
     * @memberof Location
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface Person
 */
export interface Person {
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    name?: string;
    /**
     * 
     * @type {PersonType}
     * @memberof Person
     */
    personType?: PersonType;
    /**
     * 
     * @type {Array<Skill>}
     * @memberof Person
     */
    skills?: Array<Skill>;
    /**
     * 
     * @type {Location}
     * @memberof Person
     */
    location?: Location;
    /**
     * 
     * @type {Array<TimeSlot>}
     * @memberof Person
     */
    availability?: Array<TimeSlot>;
    /**
     * 
     * @type {Array<Skill>}
     * @memberof Person
     */
    requiredSkills?: Array<Skill>;
    /**
     * 
     * @type {boolean}
     * @memberof Person
     */
    needsEvaluation?: boolean;
    /**
     * 
     * @type {Array<Person>}
     * @memberof Person
     */
    vetoes?: Array<Person>;
    /**
     * 
     * @type {Array<Array<string>>}
     * @memberof Person
     */
    hasAlreadyInspected?: Array<Array<string>>;
    /**
     * 
     * @type {number}
     * @memberof Person
     */
    maxNumberOfInspections?: number;
    /**
     * 
     * @type {number}
     * @memberof Person
     */
    maxNumberOfInspectionsCalc?: number;
    /**
     * 
     * @type {number}
     * @memberof Person
     */
    minNumberOfInspectionsCalc?: number;
    /**
     * 
     * @type {Settings}
     * @memberof Person
     */
    settings?: Settings;
    /**
     * 
     * @type {number}
     * @memberof Person
     */
    numberOfAssignments?: number;
    /**
     * 
     * @type {boolean}
     * @memberof Person
     */
    notTravellingInRange?: boolean;
}
/**
 * 
 * @export
 * @interface PersonType
 */
export interface PersonType {
    /**
     * 
     * @type {string}
     * @memberof PersonType
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface Range
 */
export interface Range {
    /**
     * 
     * @type {Array<number>}
     * @memberof Range
     */
    value?: Array<number>;
    /**
     * 
     * @type {number}
     * @memberof Range
     */
    min?: number;
    /**
     * 
     * @type {number}
     * @memberof Range
     */
    max?: number;
}
/**
 * 
 * @export
 * @interface Settings
 */
export interface Settings {
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    nbProParticipants?: Range;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    numberOfAssignmentsForAProfessional?: Range;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    nbNonProParticipants?: Range;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    numberOfAssignmentsForANonProfessional?: Range;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    nbExternalParticipants?: Range;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    numberOfAssignmentsForAnExternal?: Range;
    /**
     * 
     * @type {number}
     * @memberof Settings
     */
    nbRotationsToReinspect?: number;
    /**
     * 
     * @type {number}
     * @memberof Settings
     */
    nbInspectorsFollowingUp?: number;
    /**
     * 
     * @type {DistanceMatrix}
     * @memberof Settings
     */
    distanceMatrix?: DistanceMatrix;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    travellingDistanceRange?: Range;
    /**
     * 
     * @type {boolean}
     * @memberof Settings
     */
    useAvailability?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Settings
     */
    shuffleParticipants?: boolean;
    /**
     * 
     * @type {Range}
     * @memberof Settings
     */
    committeeMeetingSize?: Range;
}
/**
 * 
 * @export
 * @interface Skill
 */
export interface Skill {
    /**
     * 
     * @type {string}
     * @memberof Skill
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface SolverOptions
 */
export interface SolverOptions {
    /**
     * 
     * @type {Settings}
     * @memberof SolverOptions
     */
    settings?: Settings;
    /**
     * 
     * @type {Array<Person>}
     * @memberof SolverOptions
     */
    participants?: Array<Person>;
}
/**
 * 
 * @export
 * @enum {string}
 */

export enum SolverStatus {
    SolvingScheduled = 'SOLVING_SCHEDULED',
    SolvingActive = 'SOLVING_ACTIVE',
    NotSolving = 'NOT_SOLVING'
}

/**
 * 
 * @export
 * @interface TimeSlot
 */
export interface TimeSlot {
    /**
     * 
     * @type {string}
     * @memberof TimeSlot
     */
    name?: string;
}

/**
 * CommitteeSolutionResourceApi - axios parameter creator
 * @export
 */
export const CommitteeSolutionResourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('apiCommitteeSolutionIdGet', 'id', id)
            const localVarPath = `/api/committeeSolution/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SolverOptions} [solverOptions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionSolvePost: async (solverOptions?: SolverOptions, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/committeeSolution/solve`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(solverOptions, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionStopSolvingIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('apiCommitteeSolutionStopSolvingIdGet', 'id', id)
            const localVarPath = `/api/committeeSolution/stopSolving/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CommitteeSolutionResourceApi - functional programming interface
 * @export
 */
export const CommitteeSolutionResourceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CommitteeSolutionResourceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCommitteeSolutionIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommitteeSolution>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCommitteeSolutionIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {SolverOptions} [solverOptions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCommitteeSolutionSolvePost(solverOptions?: SolverOptions, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommitteeSolution>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCommitteeSolutionSolvePost(solverOptions, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCommitteeSolutionStopSolvingIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCommitteeSolutionStopSolvingIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CommitteeSolutionResourceApi - factory interface
 * @export
 */
export const CommitteeSolutionResourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CommitteeSolutionResourceApiFp(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionIdGet(id: string, options?: any): AxiosPromise<CommitteeSolution> {
            return localVarFp.apiCommitteeSolutionIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SolverOptions} [solverOptions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionSolvePost(solverOptions?: SolverOptions, options?: any): AxiosPromise<CommitteeSolution> {
            return localVarFp.apiCommitteeSolutionSolvePost(solverOptions, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCommitteeSolutionStopSolvingIdGet(id: string, options?: any): AxiosPromise<string> {
            return localVarFp.apiCommitteeSolutionStopSolvingIdGet(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CommitteeSolutionResourceApi - object-oriented interface
 * @export
 * @class CommitteeSolutionResourceApi
 * @extends {BaseAPI}
 */
export class CommitteeSolutionResourceApi extends BaseAPI {
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommitteeSolutionResourceApi
     */
    public apiCommitteeSolutionIdGet(id: string, options?: any) {
        return CommitteeSolutionResourceApiFp(this.configuration).apiCommitteeSolutionIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SolverOptions} [solverOptions] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommitteeSolutionResourceApi
     */
    public apiCommitteeSolutionSolvePost(solverOptions?: SolverOptions, options?: any) {
        return CommitteeSolutionResourceApiFp(this.configuration).apiCommitteeSolutionSolvePost(solverOptions, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommitteeSolutionResourceApi
     */
    public apiCommitteeSolutionStopSolvingIdGet(id: string, options?: any) {
        return CommitteeSolutionResourceApiFp(this.configuration).apiCommitteeSolutionStopSolvingIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
}


