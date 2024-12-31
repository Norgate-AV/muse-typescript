export {};

declare global {
    var global: typeof globalThis;

    /**
     * Context is the handle for the Mojo engine. It has logging and device access features.
     */
    var context: Muse.Context;

    /**
     * The Mojo Universal Scripting Engine (MUSE) contains a framework for communicating with AMX devices,
     * modules, and other AMX specific facilities: the Thing API.
     */
    namespace Muse {
        /**
         * Context is the handle for the Mojo engine. It has logging and device access features.
         */
        interface Context {
            devices: Devices;
            log: LogFunction & Log;
            services: Services;
            export: Export;
        }

        // prettier-ignore
        type DeviceType<T> =
            T extends `AMX-${number}` ? ICSP.Driver :
            T extends `idevice` ? IDevice :
            T extends `led` ? LED :
            never;

        interface Devices {
            /**
             * Get a specific device by its name
             *
             * @param {T} name The ID of the device
             *
             * @returns {DeviceType<T>} The device object
             */
            get<T extends string>(name: T): DeviceType<T>;
            /**
             * Get a specific device by its name
             *
             * @template T The type of the device object
             *
             * @param {string} name The ID of the device
             *
             * @returns {T} The device object
             */
            get<T = any>(name: string): T;

            /**
             * Check if a specific device is defined
             *
             * @param {string} name The ID of the device
             *
             * @returns {boolean} true if the device is defined, false otherwise
             */
            has(name: string): boolean;

            /**
             * Get the list of defined devices
             *
             * @returns {Array<string>} An array of device IDs
             */
            ids(): Array<string>;
        }

        /**
         * Available log levels
         */
        type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";

        type LogFunction = (msg: any) => void;

        interface Log {
            /**
             * Set/Get the current logging threshold
             */
            level: LogLevel;

            /**
             * Issue a log message at TRACE level
             *
             * @param {any} msg The message to log
             *
             * @returns {void} void
             */
            trace(msg: any): void;

            /**
             * Issue a log message at DEBUG level
             *
             * @param {any} msg The message to log
             *
             * @returns {void} void
             */
            debug(msg: any): void;

            /**
             * Issue a log message at INFO level
             *
             * @param {any} msg The message to log
             *
             * @returns {void} void
             */
            info(msg: any): void;

            /**
             * Issue a log message at WARNING level
             *
             * @param {any} msg The message to log
             *
             * @returns {void} void
             */
            warn(msg: any): void;

            /**
             * Issue a log message at ERROR level
             *
             * @param {any} msg The message to log
             *
             * @returns {void} void
             */
            error(msg: any): void;
        }

        interface ServiceType {
            timeline: TimelineService;
            platform: PlatformService;
            diagnostic: DiagnosticService;
            netlinxClient: LegacyNetLinxClientService;
            session: SessionService;
            smtp: SmtpService;
        }

        interface Services {
            /**
             * Get a service by name
             *
             * @param {keyof ServiceType} name The name of the service
             *
             * @returns {ServiceType[T]} The service object
             */
            get<T extends keyof ServiceType>(name: T): ServiceType[T];

            /**
             * Get a service by name
             *
             * @template T The type of the service object
             *
             * @param {string} name The name of the service
             *
             * @returns {T} The service object
             */
            get<T = any>(name: string): T;

            /**
             * Check if a service is available
             *
             * @param {string} name The name of the service
             *
             * @returns {boolean} true if the service is available, false otherwise
             */
            has(name: string): boolean;

            /**
             * Get the list of available services
             *
             * @returns {Array<string>} An array of service names
             */
            ids(): Array<string>;
        }

        interface Export {
            /**
             * Allows a script to generate events
             *
             * @param {string} path The path of the event in the descriptor
             * @param {Record<string, any>} [args] Map of key-value pairs representing the arguments of the event that will be generated
             *
             * @returns {void} void
             */
            dispatch<T = Record<string, any>>(path: string, args?: T): void;

            /**
             * Allows a script to update the value of a parameter. When updated, any listeners to
             * that parameter will automatically be updated with the new value
             *
             * @template T The type of the parameter value
             *
             * @param {string} path The path of the parameter that is being updated
             * @param {T} value The new value of the parameter
             * @param {number} [normalized] The normalized value of the parameter
             *
             * @returns {void} void
             */
            update<T = any>(path: string, value: T, normalized?: number): void;
        }

        /**
         * Any callback or lambda functions for a .listen passed the event structure.
         * This contains the specific information that triggered the event.
         */
        interface Event<T = DataEvent> {
            /**
             * The property of the device that this event refers to
             */
            path: string;

            /**
             * A shortened version path. For ICSP, only the button number is conveyed
             */
            id: string;

            /**
             * The data payload of the event, dependent on the specific event
             */
            arguments: T;

            /**
             * The data value before the event was processed
             */
            oldValue: T;

            /**
             * The object reference for the specific parameter that was updated
             */
            source: string;
        }

        /**
         * The default event type for all events
         */
        interface DataEvent {
            /**
             * The data payload of the event, dependent on the specific event
             */
            data: string;
        }

        /**
         * The *Timeline* service provides a mechanism for triggering events based on a sequence of times. The sequence of times is pass the *start* function as an array of integer values, with each value representing a time period, in milliseconds, that is either an offset the start of the timeline or relative to the previously triggered event.
         *
         * Each call into the context's service requests returns a new instance of a timeline.
         *
         * @example JavaScript
         * ```javascript
         * const timeline = context.services.get("timeline");
         *
         * // Start the timeline with a sequence of times
         * // The timeline will trigger events at 1000ms, 2000ms, and 3000ms
         * // The timeline will not repeat
         * timeline.start([1000, 2000, 3000], false, 0);
         *
         * // Listen for events from the timeline
         * timeline.expired.listen((event) => {
         *      context.log(`Time: ${event.arguments.time}`);
         *      context.log(`Repetition: ${event.arguments.repetition}`);
         *      context.log(`Sequence: ${event.arguments.sequence}`);
         * });
         *
         * // Stop the timeline
         * timeline.stop();
         * ```
         *
         * @example TypeScript
         * ```typescript
         * const timeline = context.services.get<Muse.TimelineService>("timeline");
         *
         * // Start the timeline with a sequence of times
         * // The timeline will trigger events each 1000ms
         * // The timeline will repeat forever
         * timeline.start([1000], false, -1);
         *
         * // Listen for events from the timeline
         * timeline.expired.listen((event) => {
         *     context.log(`Time: ${event.arguments.time}`);
         *     context.log(`Repetition: ${event.arguments.repetition}`);
         *     context.log(`Sequence: ${event.arguments.sequence}`);
         * });
         *
         * // Stop the timeline
         * timeline.stop();
         * ```
         */
        interface TimelineService {
            /**
             * Starts the timeline
             *
             * @param {Array<number>} intervals Array of time intervals in milliseconds
             * @param {boolean} [relative = false] If there multiple times in the array, it determines whether the timings are treated as relative delays between triggers, or as an independent list of times that may trigger out of sequence relative to the order in the list.
             * @param {number} [repeat = 0] A value of -1 indicates that the timeline should run forever. A timeline started with a value of 0 will run once. The value indicates the number of repetitions.
             *
             * @returns {void} void
             */
            start(
                intervals: Array<number>,
                relative?: boolean,
                repeat?: number,
            ): void;

            /**
             * Stops the timeline
             *
             * @returns {void} void
             */
            stop(): void;

            /**
             * Pauses the timeline
             *
             * @returns {void} void
             */
            pause(): void;

            /**
             * Resumes the timeline from a paused state
             *
             * @returns {void} void
             */
            restart(): void;

            /**
             * Receive events from the timeline
             */
            expired: {
                /**
                 * Listen for events from the timeline
                 *
                 * @param {Function} callback The function that will be called when the timer expires
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(callback: TimelineEventCallback): Listener;

                /**
                 * Stop listening for events from the timeline
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };
        }

        type Listener = () => void;
        type Watcher = () => void;

        interface TimelineEvent {
            /**
             * The sequence number of the event
             */
            sequence: number;

            /**
             * The time in milliseconds when the event was triggered
             */
            time: number;

            /**
             * The number of times the event has been triggered
             */
            repetition: number;
        }

        type TimelineEventCallback = (event?: Event<TimelineEvent>) => void;

        namespace Program {
            /**
             * Programming Language
             */
            type Provider = "groovy" | "javascript" | "python";

            /**
             * A MUSE program descriptor file
             */
            interface ProgramFile {
                /**
                 * Globally unique program ID, special characters are not allowed
                 *
                 * Must match the pattern `/^[a-zA-z0-9_]+$/`
                 */
                id: string;

                /**
                 * A description of the program that may be used by user interfaces
                 */
                description?: string;

                /**
                 * Disable the auto-start of the script on system boot
                 *
                 * @default false
                 */
                disabled?: boolean;

                /**
                 * Name/Value pairs that can be used to set configuration of a program
                 */
                envvars?: Record<string, string>;

                /**
                 * The scope (location) to which the script belongs. Leave blank for global scope
                 *
                 * Must match the pattern `/^[a-zA-z0-9_\.]+$/`
                 */
                scope?: string;

                /**
                 * The language the program is written in
                 */
                provider: Provider;

                /**
                 * The file name of the main entry point of the program
                 *
                 * @default "index.<extension>"
                 */
                script?: string;
            }
        }

        /**
         * The *Platform* service provides a mechanism to read platform parameters such as model and version.
         *
         * @example JavaScript
         * ```javascript
         * const platform = context.services.get("platform");
         *
         * context.log(`Device State: ${platform.devicestate}`);
         * context.log(`Location: ${platform.location}`);
         * context.log(`Name: ${platform.name}`);
         * context.log(`Version: ${platform.version}`);
         * context.log(`Venue: ${platform.venue}`);
         * context.log(`Description: ${platform.description}`);
         * context.log(`Serial Number: ${platform.serialnumber}`);
         * context.log(`Family: ${platform.family}`);
         * context.log(`Manufacturer: ${platform.manufacturer}`);
         * context.log(`Model: ${platform.model}`);
         * context.log(`Label: ${platform.label}`);
         * ```
         * @example TypeScript
         * ```typescript
         * const platform = context.services.get<Muse.PlatformService>("platform");
         *
         * context.log(`Device State: ${platform.devicestate}`);
         * context.log(`Location: ${platform.location}`);
         * context.log(`Name: ${platform.name}`);
         * context.log(`Version: ${platform.version}`);
         * context.log(`Venue: ${platform.venue}`);
         * context.log(`Description: ${platform.description}`);
         * context.log(`Serial Number: ${platform.serialnumber}`);
         * context.log(`Family: ${platform.family}`);
         * context.log(`Manufacturer: ${platform.manufacturer}`);
         * context.log(`Model: ${platform.model}`);
         * context.log(`Label: ${platform.label}`);
         * ```
         */
        interface PlatformService {
            /**
             * A string containing the current platform state. ex. "Running"
             */
            devicestate: Readonly<string>;

            /**
             * A string containing the platform location
             */
            location: Readonly<string>;

            /**
             * A string containing the platform name
             */
            name: Readonly<string>;

            /**
             * A string containing the platform version
             */
            version: Readonly<string>;

            /**
             * A string containing the platform venue
             */
            venue: Readonly<string>;

            /**
             * A string containing the platform description
             */
            description: Readonly<string>;

            /**
             * A string containing the platform serial number
             */
            serialnumber: Readonly<string>;

            /**
             * A string containing the platform family
             */
            family: Readonly<string>;

            /**
             * A string containing the platform manufacturer
             */
            manufacturer: Readonly<string>;

            /**
             * A string containing the platform model
             */
            model: Readonly<string>;

            /**
             * A string containing the platform label
             */
            label: Readonly<string>;
        }

        interface DiagnosticService {
            /**
             * A string containing the CPU information
             */
            cpu_info: Readonly<string>;

            /**
             * A string containing the garbage collection information
             */
            garbage_collection: Readonly<string>;

            /**
             * A string containing the heap usage information
             */
            heap_usage: Readonly<string>;

            /**
             * A string containing the memory information
             */
            os_memory: Readonly<string>;
        }

        /**
         * The *NetLinxClient* service provides a mechanism for scripting language to communicate with a legacy NX controller.
         *
         * @deprecated Support for the netlinxClient service has been deprecated and replaced by the Netlinx Driver. It may be removed in the future.
         * @alias LegacyNetLinxClientService Use the *LegacyNetLinxClientService* alias to access the NetLinxClientService without deprecation warnings
         */
        interface NetLinxClientService {
            /**
             * Receive online events from the NetLinx client
             */
            online: {
                /**
                 * Listen for online events from the NetLinx client
                 *
                 * @param {Function} callback The function that will be called when the device comes online
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(callback: (event?: any) => void): Listener;

                /**
                 * Stop listening for online events from the NetLinx client
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * Receive offline events from the NetLinx client
             */
            offline: {
                /**
                 * Listen for offline events from the NetLinx client
                 *
                 * @param {Function} callback The function that will be called when the device goes offline
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(callback: (event?: any) => void): Listener;

                /**
                 * Stop listening for offline events from the NetLinx client
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * Receive string events from the NetLinx client
             */
            string: {
                /**
                 * Listen for string events from the NetLinx client
                 *
                 * @param {Function} callback The function that will be called when a string is received
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(callback: (event?: Event) => void): Listener;

                /**
                 * Stop listening for string events from the NetLinx client
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * Receive command events from the NetLinx client
             */
            command: {
                /**
                 * Listen for command events from the NetLinx client
                 *
                 * @param {Function} callback The function that will be called when a command is received
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(callback: (event?: Event) => void): Listener;

                /**
                 * Stop listening for command events from the NetLinx client
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * Initiates a connection to NetLinx Controller
             *
             * @param {string} host A string containing the destination NetLinx Controller IP address or hostname
             * @param {number} device A integer containing the local ICSP device number to report to remote controller
             * @param {string} [username] A string containing the username used for ICSP authentication
             * @param {string} [password] A string containing the password used for ICSP authentication
             *
             * @returns {void} void
             */
            connect(
                host: string,
                device: number,
                username?: string,
                password?: string,
            ): void;

            /**
             * Closes a connection to a NetLinx Controller
             *
             * @returns {void} void
             */
            disconnect(): void;

            /**
             * Sends a command to the device
             *
             * @param {string} data The command to send
             *
             * @returns {void} void
             */
            send_command(data: string): void;

            /**
             * Sends a string to the device
             *
             * @param {string} data The string to send
             *
             * @returns {void} void
             */
            send_string(data: string): void;
        }

        /**
         * The *LegacyNetLinxClient* service provides a mechanism for scripting language to communicate with a legacy NX controller.
         */
        type LegacyNetLinxClientService = NetLinxClientService;

        /**
         * The *Session* service provides a mechanism for authenticating users  from within a script.
         *
         * Each call into the context's service requests returns the same, single instance of SessionService.
         */
        interface SessionService {
            /**
             * After the *login* command, *onLogin* will be dispatched to any listeners
             */
            onLogin: {
                /**
                 * Listen for login events from the session service
                 *
                 * @param {Function} callback The function that will be called when the user logs in
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(
                    callback: (event?: Event<SessionLoginEvent>) => void,
                ): Listener;

                /**
                 * Stop listening for login events from the session service
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * After the *logout* command, *onLogout* will be dispatched to any listeners
             */
            onLogout: {
                /**
                 * Listen for logout events from the session service
                 *
                 * @param {Function} callback The function that will be called when the user logs out
                 *
                 * @returns {Listener} A listener object that can be used to unlisten
                 */
                listen(
                    callback: (event?: Event<SessionLogoutEvent>) => void,
                ): Listener;

                /**
                 * Stop listening for logout events from the session service
                 *
                 * @param {Listener} listener The listener object returned from the listen function
                 *
                 * @returns {void} void
                 */
                unlisten(listener: Listener): void;
            };

            /**
             * The login command authenticates and logs in a user
             *
             * @param {string} username The username to authenticate with
             * @param {string} password The password to authenticate with
             *
             * @returns {void} void
             */
            login(username: string, password: string): void;

            /**
             * The *logout* command ends the session associated with the provided username
             *
             * @param {string} username The username to logout
             *
             * @returns {void} void
             */
            logout(username: string): void;
        }

        /**
         * Session Logout Event
         */
        interface SessionLogoutEvent {
            /**
             * The username provided in the *logout* command
             */
            username: string;
        }

        /**
         * Session Login Event
         */
        interface SessionLoginEvent {
            /**
             * The username provided in the *login* command
             */
            username: string;

            /**
             * The boolean for the success or failure of the login
             */
            status: boolean;

            /**
             * The string success or failure message associated with the login
             */
            statusMsg: string;

            /**
             * The dstring format list of permissions associated with the user upon a successful login
             */
            permissions: string;
        }

        /**
         * The *SMTP* service provides a mechanism for sending email and attachments. Once configuration values have been set, an email can be sent by passing
         * the *sendEmail* function an email address & name, and optional parameters.
         *
         * The *SMTP* service supports three commands to construct and send an email. All arguments are initially declared as strings, and all fields including
         * optional must be filled. An optional field filled with "" will be ignored, but is required to function.
         */
        interface SmtpService {
            /**
             * Set the configuration for the SMTP service
             *
             * @param {string} domain The domain of the SMTP server
             * @param {string} username The username to authenticate with
             * @param {string} password The password to authenticate with
             * @param {string} name The name of the sender
             * @param {number} port The port to connect to
             * @param {boolean} tls Whether to use TLS
             *
             * @returns {void} void
             */
            setConfig(
                domain: string,
                username: string,
                password: string,
                name: string,
                port: number,
                tls: boolean,
            ): void;

            /**
             * Get the current configuration of the SMTP service
             *
             * @returns {unknown} The current configuration
             */
            getConfig(): unknown;

            /**
             * Clear the current configuration of the SMTP service
             *
             * @returns {void} void
             */
            clearConfig(): void;

            /**
             * Sends an email
             *
             * @param {string} address The email address to send to
             * @param {string} name The name of the recipient
             * @param {string} subject The subject of the email
             * @param {string} body The body of the email
             * @param {string} [attachment] The attachment to include
             * @param {string} [fileName] The name of the attachment
             *
             * @returns {void} void
             */
            sendEmail(
                address: string,
                name: string,
                subject: string,
                body: string,
                attachment?: string,
                fileName?: string,
            ): void;

            // echoOn(): void;
            // echo(): void;
            // hello(): void;
        }

        /**
         * The *ICSP* namespace provides a mechanism for communicating with ICSP devices.
         */
        namespace ICSP {
            /**
             * The main interface for the ICSP driver
             */
            interface Driver {
                /**
                 * The configuration of the ICSP device
                 */
                configuration: Configuration;

                /**
                 * An array of ICSP device ports
                 */
                port: Array<Port>;

                /**
                 * Receive online events from the ICSP driver
                 *
                 * @param {OnlineOfflineCallback} callback The function that will be called when the device comes online
                 *
                 * @returns {void} void
                 */
                online(callback: OnlineOfflineCallback): void;

                /**
                 * Receive offline events from the ICSP driver
                 *
                 * @param {OnlineOfflineCallback} callback The function that will be called when the device goes offline
                 *
                 * @returns {void} void
                 */
                offline(callback: OnlineOfflineCallback): void;

                /**
                 * Get the current online status of the device
                 *
                 * @returns {boolean} true if the device is online, false otherwise
                 */
                isOnline(): boolean;

                /**
                 * Get the current offline status of the device
                 *
                 * @returns {boolean} true if the device is offline, false otherwise
                 */
                isOffline(): boolean;
            }

            type OnlineOfflineCallback = () => void;

            interface Configuration {
                device: Device;
            }

            interface Device {
                /**
                 * The Java class name of the device
                 */
                classname: Readonly<string>;

                /**
                 * The container of the device
                 */
                container: Readonly<string>;

                /**
                 * The description of the device
                 */
                description: Readonly<string>;

                /**
                 * The descriptor location of the device
                 */
                descriptorlocation: Readonly<string>;

                /**
                 * The current device state
                 */
                devicestate: Readonly<string>;

                /**
                 * The family of the device
                 */
                family: Readonly<string>;

                /**
                 * The guid of the device
                 */
                guid: Readonly<string>;

                /**
                 * The label of the device
                 */
                location: Readonly<string>;

                /**
                 * The manufacturer of the device
                 */
                manufacturer: Readonly<string>;

                /**
                 * The model of the device
                 */
                model: Readonly<string>;

                /**
                 * The name of the device
                 */
                name: Readonly<string>;

                /**
                 * The platform of the device
                 */
                protocolversion: Readonly<string>;

                /**
                 * The serial number of the device
                 */
                serialnumber: Readonly<string>;

                /**
                 * The software version of the device
                 */
                softwareversion: Readonly<string>;

                /**
                 * The venue of the device
                 */
                venue: Readonly<string>;

                /**
                 * The version of the device
                 */
                version: Readonly<string>;
            }

            interface CustomEvent extends DataEvent {
                encode: string;
                flag: number;
                value1: number;
                value2: number;
                value3: number;
                id: number;
                type: number;
            }

            type EventCallback = (event?: DataEvent) => void;
            type CustomEventCallback = (event?: CustomEvent) => void;
            type ParameterUpdateCallback<T = any> = (
                event?: ParameterUpdate<T>,
            ) => void;

            interface Port {
                /**
                 * Array of button objects
                 */
                button: Array<Readonly<Button>>;

                /**
                 * Array of channel objects
                 */
                channel: Array<boolean & Channel>;

                command(callback: EventCallback): void;
                custom(callback: CustomEventCallback): void;

                /**
                 * Array of level objects
                 */
                level: Array<number & Level>;

                /**
                 * Sends a command to the device
                 *
                 * @param {string} data The command to send
                 *
                 * @returns {void} void
                 */
                send_command(data: string): void;

                /**
                 * Sends a string to the device
                 *
                 * @param {string} data The string to send
                 *
                 * @returns {void} void
                 */
                send_string(data: string): void;

                string(callback: EventCallback): void;
            }

            interface Button {
                /**
                 * Watch for button parameter events
                 *
                 * @param {ParameterUpdateCallback<boolean>} callback The function that will be called when the button parameter changes
                 *
                 * @returns {Watcher} A watcher object that can be used to unwatch
                 */
                watch(callback: ParameterUpdateCallback<boolean>): Watcher;

                /**
                 * Stop watching for button parameter events
                 *
                 * @param {Watcher} watcher The watcher object returned from the watch function
                 *
                 * @returns {void} void
                 */
                unwatch(watcher: Watcher): void;
            }

            interface Channel {
                /**
                 * Watch for channel parameter events
                 *
                 * @param {ParameterUpdateCallback<boolean>} callback The function that will be called when the channel parameter changes
                 */
                watch(callback: ParameterUpdateCallback<boolean>): Watcher;

                /**
                 * Stop watching for channel parameter events
                 *
                 * @param {Watcher} watcher The watcher object returned from the watch function
                 *
                 * @returns {void} void
                 */
                unwatch(watcher: Watcher): void;
            }

            interface Level {
                /**
                 * Watch for level parameter events
                 *
                 * @param {ParameterUpdateCallback<number>} callback The function that will be called when the level parameter changes
                 *
                 * @returns {Watcher} A watcher object that can be used to unwatch
                 */
                watch(callback: ParameterUpdateCallback<number>): Watcher;

                /**
                 * Stop watching for level parameter events
                 *
                 * @param {Watcher} watcher The watcher object returned from the watch function
                 *
                 * @returns {void} void
                 */
                unwatch(watcher: Watcher): void;
            }
        }

        interface Parameter<T = any> {
            /**
             * The new value which caused the parameter change callback
             */
            value: string;

            /**
             * A float value between 0 and 1, inclusive, based on the value's range
             */
            normalized: number;

            /**
             * The minimum value of a numerical parameter
             */
            min: T;

            /**
             * The maximum value of a numerical parameter
             */
            max: T;

            /**
             * The default value of a parameter
             */
            defaultValue: T;

            /**
             * The data type of this specific parameter
             */
            type: number;

            /**
             * For an enumeration, the specific data points available
             */
            enums: Array<string>;
        }

        /**
         * Any callback or lambda functions for a .watch() attached to a parameter is passed this structure.
         * This contains the specific information that triggered the parameter change event.
         *
         * @template T The type of the parameter value
         */
        interface ParameterUpdate<T = any> {
            /**
             * The specific parameter that has been updated
             */
            path: string;

            /**
             * The last element of the path
             */
            id: string;

            /**
             * The current value of the parameter
             */
            value: T;

            /**
             * The current value of the parameter
             */
            newValue: T;

            /**
             * The previous value of the parameter
             */
            oldValue: T;

            /**
             * A float value between 0 and 1, inclusive, based on the range of the value
             */
            normalized: number;

            /**
             * The object reference for the specific parameter that was updated
             */
            source: object;
        }

        interface IDevice {
            serial?: Array<IDevice.SerialPort>;
            relay?: Array<IDevice.RelayPort>;
            ir?: Array<IDevice.IRPort>;
            io?: Array<IDevice.IOPort>;
        }

        namespace IDevice {
            type SerialEventCallback = (event?: Event) => void;

            type SerialBaudRate =
                | "300"
                | "600"
                | "1200"
                | "1800"
                | "2400"
                | "4800"
                | "7200"
                | "9600"
                | "14400"
                | "19200"
                | "38400"
                | "56000"
                | "57600"
                | "115200";

            type SerialParity = "NONE" | "EVEN" | "ODD" | "MARK" | "SPACE";
            type SerialDataBits = 5 | 6 | 7 | 8;
            type SerialStopBits = 1 | 2;
            type SerialMode = "232" | "485" | "422";

            interface SerialPort {
                /**
                 * Set the parameters for the serial port
                 *
                 * @param {SerialBaudRate} baud The baud rate of the serial port
                 * @param {SerialDataBits} [databits = 8] The number of data bits
                 * @param {SerialStopBits} [stopbits = 1] The number of stop bits
                 * @param {SerialParity} [parity = "NONE"] The parity of the serial port
                 * @param {SerialMode} [mode = "232"] The mode of the serial port
                 *
                 * @returns {void} void
                 */
                setComParams(
                    baud: SerialBaudRate,
                    databits?: SerialDataBits,
                    stopbits?: SerialStopBits,
                    parity?: SerialParity,
                    mode?: SerialMode,
                ): void;

                /**
                 * Get the serial port parity parameter
                 */
                parity: Readonly<Parameter>;

                /**
                 * Send data to the serial port
                 *
                 * @param {string} data The data to send
                 *
                 * @returns {void} void
                 */
                send(data: string): void;

                /**
                 * Receive data from the serial port
                 */
                receive: {
                    /**
                     * Listen for data from the serial port
                     *
                     * @param {SerialEventCallback} callback The function that will be called when data is received
                     *
                     * @returns {Listener} A listener object that can be used to unlisten
                     */
                    listen(callback: SerialEventCallback): Listener;

                    /**
                     * Stop listening for data from the serial port
                     *
                     * @param {Listener} listener The listener object returned from the listen function
                     *
                     * @returns {void} void
                     */
                    unlisten(listener: Listener): void;
                };
            }

            type RelayEventCallback = (
                event?: ParameterUpdate<boolean>,
            ) => void;

            interface RelayPort {
                /**
                 * The relay parameter
                 */
                state: boolean & {
                    /**
                     * The current value of the relay parameter
                     */
                    value: boolean;

                    /**
                     * Watch for relay parameter events
                     *
                     * @param {RelayEventCallback} callback The function that will be called when the relay parameter changes
                     *
                     * @returns {Watcher} A watcher object that can be used to unwatch
                     */
                    watch(callback: RelayEventCallback): Watcher;

                    /**
                     * Stop watching for relay parameter events
                     *
                     * @param {Watcher} watcher The watcher object returned from the watch function
                     *
                     * @returns {void} void
                     */
                    unwatch(watcher: Watcher): void;
                };
            }

            interface IRPort {
                /**
                 * Send an IR code
                 *
                 * @param {number} code The IR code to send
                 *
                 * @returns {void} void
                 */
                clearAndSendIr(code: number): void;
            }

            type DigitalEventCallback = (
                event?: ParameterUpdate<boolean>,
            ) => void;

            interface IOPort {
                /**
                 * The digital output parameter
                 */
                digitalOutput: boolean & {
                    /**
                     * The current value of the digital output parameter
                     */
                    value: boolean;

                    /**
                     * Watch for digital output parameter events
                     *
                     * @param {DigitalEventCallback} callback The function that will be called when the digital output parameter changes
                     *
                     * @returns {Watcher} A watcher object that can be used to unwatch
                     */
                    watch(callback: DigitalEventCallback): Watcher;

                    /**
                     * Stop watching for digital output parameter events
                     *
                     * @param {Watcher} watcher The watcher object returned from the watch function
                     *
                     * @returns {void} void
                     */
                    unwatch(watcher: Watcher): void;
                };

                /**
                 * The digital input parameter
                 */
                digitalInput: boolean & {
                    /**
                     * The current value of the digital input parameter
                     */
                    value: boolean;

                    /**
                     * Watch for digital input parameter events
                     *
                     * @param {DigitalEventCallback} callback The function that will be called when the digital input parameter changes
                     *
                     * @returns {Watcher} A watcher object that can be used to unwatch
                     */
                    watch(callback: DigitalEventCallback): Watcher;

                    /**
                     * Stop watching for digital input parameter events
                     *
                     * @param {Watcher} watcher The watcher object returned from the watch function
                     *
                     * @returns {void} void
                     */
                    unwatch(watcher: Watcher): void;
                };
            }
        }

        interface LED {}
        namespace LED {}

        namespace NetLinx {
            interface Driver {}
        }
    }
}
