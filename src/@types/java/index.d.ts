export {};

declare global {
    type int = number;
    type long = number;
    type float = number;
    type double = number;
    type byte = number;
    type char = string;

    type chararray = [byte];
    type bytearray = [char];

    namespace Java {
        function type<T = any>(t: string): T;
        function from<T = any>(list: java.util.List<T>): Array<T>;
        // function extend<T = any>(obj: T, ...args: any[]): T;
    }

    /**
     *
     * @param args
     */
    function print(...args: any[]): void;

    /**
     * Loads an external JavaScript module.
     * @param module
     */
    function load(module: string): void;

    namespace java.lang {
        interface Class<T> {}
        interface AutoCloseable {}
        interface Cloneable {}

        type Object = any;

        interface Comparable<T> {
            compareTo(arg0: T): int;
        }

        interface Runnable {
            (): void;
        }

        class System /* extends Object*/ {
            static out: java.io.PrintStream;
            static err: java.io.PrintStream;
            static in: java.io.InputStream;
            static currentTimeMillis(): long;
            static nanoTime(): long;
            static arraycopy(
                arg0: any /*java.lang.Object*/,
                arg1: int,
                arg2: any /*java.lang.Object*/,
                arg3: int,
                arg4: int,
            ): void;
            static clearProperty(arg0: string): string;
            static getenv(arg0: string): string;
            static getenv(): java.util.Map<string, string>;
            static getProperty(arg0: string): string;
            static getProperty(arg0: string, arg1: string): string;
            static identityHashCode(arg0: any /*java.lang.Object*/): int;
            static lineSeparator(): string;
            static load(arg0: string): void;
            static loadLibrary(arg0: string): void;
            static mapLibraryName(arg0: string): string;
            static setProperty(arg0: string, arg1: string): string;
        }

        class String /* extends Object implements java.io.Serializable, Comparable<any>, CharSequence*/ {
            charAt(arg0: int): any /*char*/;
            chars(): any /*java.util.stream.IntStream*/;
            codePointAt(arg0: int): int;
            codePointBefore(arg0: int): int;
            codePointCount(arg0: int, arg1: int): int;
            codePoints(): any /*java.util.stream.IntStream*/;
            compareTo(arg0: string): int;
            compareToIgnoreCase(arg0: string): int;
            concat(arg0: string): string;
            contains(arg0: any /*java.lang.CharSequence*/): boolean;
            contentEquals(arg0: any /*java.lang.CharSequence*/): boolean;
            contentEquals(arg0: any /*java.lang.StringBuffer*/): boolean;
            endsWith(arg0: string): boolean;
            equals(arg0: any /*java.lang.Object*/): boolean;
            equalsIgnoreCase(arg0: string): boolean;
            getBytes(): bytearray;
            getBytes(arg0: any /*java.nio.charset.Charset*/): bytearray;
            getBytes(arg0: int, arg1: int, arg2: bytearray, arg3: int): void;
            getBytes(arg0: string): bytearray;
            getChars(arg0: int, arg1: int, arg2: chararray, arg3: int): void;
            indexOf(arg0: int): int;
            indexOf(arg0: int, arg1: int): int;
            indexOf(arg0: string): int;
            indexOf(arg0: string, arg1: int): int;
            intern(): string;
            isEmpty(): boolean;
            lastIndexOf(arg0: int): int;
            lastIndexOf(arg0: int, arg1: int): int;
            lastIndexOf(arg0: string): int;
            lastIndexOf(arg0: string, arg1: int): int;
            length(): int;
            matches(arg0: string): boolean;
            offsetByCodePoints(arg0: int, arg1: int): int;
            regionMatches(
                arg0: boolean,
                arg1: int,
                arg2: string,
                arg3: int,
                arg4: int,
            ): boolean;
            regionMatches(
                arg0: int,
                arg1: string,
                arg2: int,
                arg3: int,
            ): boolean;
            replace(arg0: any /*char*/, arg1: any /*char*/): string;
            replace(
                arg0: any /*java.lang.CharSequence*/,
                arg1: any /*java.lang.CharSequence*/,
            ): string;
            replaceAll(arg0: string, arg1: string): string;
            replaceFirst(arg0: string, arg1: string): string;
            split(arg0: string): [string];
            split(arg0: string, arg1: int): [string];
            startsWith(arg0: string): boolean;
            startsWith(arg0: string, arg1: int): boolean;
            subSequence(arg0: int, arg1: int): any /*java.lang.CharSequence*/;
            substring(arg0: int): string;
            substring(arg0: int, arg1: int): string;
            toCharArray(): chararray;
            toLowerCase(): string;
            toLowerCase(arg0: any /*java.util.Locale*/): string;
            toString(): string;
            toUpperCase(): string;
            toUpperCase(arg0: any /*java.util.Locale*/): string;
            trim(): string;
        }

        interface Iterable<T> {
            (): java.util.Iterator<T>;
            forEach?(arg0: Consumer<T>): void;
            spliterator?(): any /*java.util.Spliterator*/;
        }

        class Thread /* extends Object implements Runnable*/ {
            static MAX_PRIORITY: int;
            static MIN_PRIORITY: int;
            static NORM_PRIORITY: int;

            constructor(arg0: java.lang.Runnable);
            start(): void;
            static sleep(arg0: long): void;
        }
    }

    namespace java.util {
        interface RandomAccess {}

        class Arrays /* extends java.lang.Object*/ {
            equals(arg0: any /*java.lang.Object*/): boolean;
            toString(): string;
        }

        interface Iterator<E> {
            forEachRemaining(arg0: Consumer<E>): void;
            hasNext(): boolean;
            next(): E;
            remove(): void;
        }

        interface Map<K, V> {
            clear(): void;
            compute(arg0: K, arg1: BiFunction<K, V, V>): V;
            computeIfAbsent(arg0: K, arg1: Func<K, V>): V;
            computeIfPresent(arg0: K, arg1: BiFunction<K, V, V>): V;
            containsKey(arg0: any /*java.lang.Object*/): boolean;
            containsValue(arg0: any /*java.lang.Object*/): boolean;
            entrySet(): Set<any /*java.util.Map$Entry*/>;
            equals(arg0: any /*java.lang.Object*/): boolean;
            forEach(arg0: BiConsumer<K, V>): void;
            get(arg0: any /*java.lang.Object*/): V;
            getOrDefault(arg0: any /*java.lang.Object*/, arg1: V): V;
            isEmpty(): boolean;
            keySet(): Set<K>;
            merge(arg0: K, arg1: V, arg2: BiFunction<V, V, V>): V;
            put(arg0: K, arg1: V): V;
            putAll(arg0: Map<K, V>): void;
            putIfAbsent(arg0: K, arg1: V): V;
            remove(arg0: any /*java.lang.Object*/): V;
            remove(
                arg0: any /*java.lang.Object*/,
                arg1: any /*java.lang.Object*/,
            ): boolean;
            replace(arg0: K, arg1: V): V;
            replace(arg0: K, arg1: V, arg2: V): boolean;
            replaceAll(arg0: BiFunction<K, V, V>): void;
            size(): int;
            values(): Collection<V>;
        }

        interface Set<E> /* extends Collection<E>*/ {
            add(arg0: E): boolean;
            addAll(arg0: Collection<E>): boolean;
            clear(): void;
            contains(arg0: any /*java.lang.Object*/): boolean;
            containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            equals(arg0: any /*java.lang.Object*/): boolean;
            forEach<T>(arg0: Consumer<T>): void;
            isEmpty(): boolean;
            iterator(): Iterator<E>;
            parallelStream(): java.util.stream.Stream<E>;
            remove(arg0: any /*java.lang.Object*/): boolean;
            removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            removeIf(arg0: Predicate<E>): boolean;
            retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            size(): int;
            spliterator(): any /*java.util.Spliterator*/;
            stream(): java.util.stream.Stream<E>;
            toArray(): [any /*java.lang.Object*/];
            toArray<T>(arg0: [T]): [T];
        }

        interface Collection<E> /* extends java.lang.Iterable<E>*/ {
            add(arg0: E): boolean;
            addAll(arg0: Collection<E>): boolean;
            clear(): void;
            contains(arg0: any /*java.lang.Object*/): boolean;
            containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            equals(arg0: any /*java.lang.Object*/): boolean;
            forEach<T>(arg0: Consumer<T>): void;
            isEmpty(): boolean;
            iterator(): Iterator<E>;
            parallelStream(): java.util.stream.Stream<E>;
            remove(arg0: any /*java.lang.Object*/): boolean;
            removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            removeIf(arg0: Predicate<E>): boolean;
            retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            size(): int;
            spliterator(): any /*java.util.Spliterator*/;
            stream(): java.util.stream.Stream<E>;
            toArray(): [any /*java.lang.Object*/];
            toArray<T>(arg0: [T]): [T];
        }

        class Optional<T> /* extends java.lang.Object*/ {
            equals(arg0: any /*java.lang.Object*/): boolean;
            filter(arg0: Predicate<T>): Optional<T>;
            flatMap<U>(arg0: Func<T, Optional<U>>): Optional<U>;
            get(): T;
            ifPresent(arg0: Consumer<T>): void;
            isPresent(): boolean;
            map<U>(arg0: Func<T, U>): Optional<U>;
            orElse(arg0: T): T;
            orElseGet(arg0: Supplier<T>): T;
            orElseThrow<X>(arg0: Supplier<X>): T;
            toString(): string;
        }

        interface List<E> /* extends Collection<E>*/ {
            add(arg0: E): boolean;
            add(arg0: int, arg1: E): void;
            addAll(arg0: Collection<E>): boolean;
            addAll(arg0: int, arg1: Collection<E>): boolean;
            clear(): void;
            contains(arg0: any /*java.lang.Object*/): boolean;
            containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            equals(arg0: any /*java.lang.Object*/): boolean;
            forEach<T>(arg0: Consumer<T>): void;
            get(arg0: int): E;
            indexOf(arg0: any /*java.lang.Object*/): int;
            isEmpty(): boolean;
            iterator(): Iterator<E>;
            lastIndexOf(arg0: any /*java.lang.Object*/): int;
            listIterator(): any /*java.util.ListIterator*/;
            listIterator(arg0: int): any /*java.util.ListIterator*/;
            parallelStream(): java.util.stream.Stream<E>;
            remove(arg0: any /*java.lang.Object*/): boolean;
            remove(arg0: int): E;
            removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            removeIf(arg0: Predicate<E>): boolean;
            replaceAll(arg0: UnaryOperator<E>): void;
            retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
            set(arg0: int, arg1: E): E;
            size(): int;
            sort(arg0: any /*java.util.Comparator*/): void;
            spliterator(): any /*java.util.Spliterator*/;
            stream(): java.util.stream.Stream<E>;
            subList(arg0: int, arg1: int): List<E>;
            toArray(): [any /*java.lang.Object*/];
            toArray<T>(arg0: [T]): [T];
        }

        class Collections /* extends java.lang.Object*/ {
            equals(arg0: any /*java.lang.Object*/): boolean;
            toString(): string;
        }
    }

    namespace java.io {
        interface Closeable {}
        interface Serializable {}

        class InputStream /* extends Object*/ {
            close(): void;
            read(): int;
            read(arg0: bytearray): int;
            read(arg0: bytearray, arg1: int, arg2: int): int;
            skip(arg0: long): long;
        }

        class PrintStream /* extends FilterOutputStream implements Appendable, Closeable*/ {
            print(arg0: boolean): void;
            print(arg0: char): void;
            print(arg0: int): void;
            print(arg0: long): void;
            print(arg0: float): void;
            print(arg0: double): void;
            print(arg0: chararray): void;
            print(arg0: string): void;
            print(arg0: any /*java.lang.Object*/): void;
            println(): void;
            println(arg0: boolean): void;
            println(arg0: char): void;
            println(arg0: int): void;
            println(arg0: long): void;
            println(arg0: float): void;
            println(arg0: double): void;
            println(arg0: chararray): void;
            println(arg0: string): void;
            println(arg0: any /*java.lang.Object*/): void;
        }

        class File /* extends Object implements Serializable, Comparable<File>*/ {
            constructor(arg0: string);
            constructor(arg0: string, arg1: string);
            constructor(arg0: java.net.URI);
            canExecute(): boolean;
            canRead(): boolean;
            canWrite(): boolean;
            compareTo(arg0: any /*java.lang.Object*/): int;
            createNewFile(): boolean;
            createTempFile(arg0: string, arg1: string): File;
            createTempFile(arg0: string, arg1: string, arg2: File): File;
            delete(): boolean;
            deleteOnExit(): void;
            equals(arg0: any /*java.lang.Object*/): boolean;
            exists(): boolean;
            getAbsoluteFile(): File;
            getAbsolutePath(): string;
            getCanonicalFile(): File;
            getCanonicalPath(): string;
            getName(): string;
            getParent(): string;
            getParentFile(): File;
            getPath(): string;
            hashCode(): int;
            isAbsolute(): boolean;
            isDirectory(): boolean;
            isFile(): boolean;
            isHidden(): boolean;
            lastModified(): long;
            length(): long;
            list(): [string];
            listFiles(): [File];
            mkdir(): boolean;
            mkdirs(): boolean;
            renameTo(arg0: File): boolean;
            setExecutable(arg0: boolean): boolean;
            setExecutable(arg0: boolean, arg1: boolean): boolean;
            setLastModified(arg0: long): boolean;
            setReadable(arg0: boolean): boolean;
            setReadable(arg0: boolean, arg1: boolean): boolean;
            setReadOnly(): boolean;
            setWritable(arg0: boolean): boolean;
            setWritable(arg0: boolean, arg1: boolean): boolean;
            toPath(): any /*java.nio.file.Path*/;
            toURI(): java.net.URI;
            toURL(): java.net.URL;
            toString(): string;
        }

        class FileWriter /* extends OutputStreamWriter*/ {
            constructor(arg0: File);
            constructor(arg0: File, arg1: boolean);
            constructor(arg0: string);
            constructor(arg0: string, arg1: boolean);
            constructor(arg0: string, arg1: boolean);
            constructor(arg0: string, arg1: boolean);
            close(): void;
            flush(): void;
            write(arg0: chararray): void;
            write(arg0: chararray, arg1: int, arg2: int): void;
            write(arg0: int): void;
            write(arg0: string): void;
            write(arg0: string, arg1: int, arg2: int): void;
        }

        class FileReader /* extends InputStreamReader*/ {
            constructor(arg0: File);
            constructor(arg0: string);
            close(): void;
            read(): int;
            read(arg0: chararray): int;
            read(arg0: chararray, arg1: int, arg2: int): int;
            ready(): boolean;
        }
    }

    namespace java.nio {
        namespace file {
            class Path /* extends Object implements Comparable<Path>, Iterable<Path>*/ {
                compareTo(arg0: any /*java.lang.Object*/): int;
                endsWith(arg0: any /*java.lang.Object*/): boolean;
                equals(arg0: any /*java.lang.Object*/): boolean;
                getFileName(): any /*java.nio.file.Path*/;
                getName(arg0: int): any /*java.nio.file.Path*/;
                getNameCount(): int;
                getParent(): any /*java.nio.file.Path*/;
                getRoot(): any /*java.nio.file.Path*/;
                hashCode(): int;
                isAbsolute(): boolean;
                iterator(): java.util.Iterator<any /*java.nio.file.Path*/>;
                normalize(): any /*java.nio.file.Path*/;
                register(
                    arg0: any /*java.nio.file.WatchService*/,
                    arg1: any /*java.nio.file.WatchEvent.Kind<any>*/[],
                    arg2: any /*java.nio.file.WatchEvent.Modifier*/[],
                ): any /*java.nio.file.WatchKey*/;
                register(
                    arg0: any /*java.nio.file.WatchService*/,
                    arg1: any /*java.nio.file.WatchEvent.Kind<any>[]*/,
                    arg2: any /*java.nio.file.WatchEvent.Modifier*/[],
                    arg3: any /*java.nio.file.WatchEvent.Modifier*/[],
                ): any /*java.nio.file.WatchKey*/;
                relativize(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                resolve(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                resolve(arg0: string): any /*java.nio.file.Path*/;
                resolveSibling(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                resolveSibling(arg0: string): any /*java.nio.file.Path*/;
                startsWith(arg0: any /*java.lang.Object*/): boolean;
                subpath(arg0: int, arg1: int): any /*java.nio.file.Path*/;
                toAbsolutePath(): any /*java.nio.file.Path*/;
                toFile(): java.io.File;
                toRealPath(
                    arg0: any /*java.nio.file.LinkOption*/,
                ): any /*java.nio.file.Path*/;
                toUri(): java.net.URI;
                toString(): string;
            }

            class Paths /* extends Object*/ {
                static get(
                    first: string,
                    ...more: string[]
                ): java.nio.file.Path;
                static get(uri: java.net.URI): java.nio.file.Path;
            }

            class Files /* extends Object*/ {
                static copy(
                    arg0: any /*java.io.InputStream*/,
                    arg1: any /*java.nio.file.Path*/,
                    arg2: any /*java.nio.file.CopyOption*/[],
                ): long;
                static copy(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.io.OutputStream*/,
                ): long;
                static copy(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.Path*/,
                    arg2: any /*java.nio.file.CopyOption*/[],
                ): any /*java.nio.file.Path*/;
                static createDirectories(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                static createDirectory(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                static createFile(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createLink(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                static createSymbolicLink(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.Path*/,
                    arg2: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createTempDirectory(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createTempDirectory(
                    arg0: string,
                    arg1: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createTempFile(
                    arg0: string,
                    arg1: string,
                    arg2: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createTempFile(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: string,
                    arg3: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.file.Path*/;
                static createTempFile(
                    arg0: string,
                    arg1: string,
                    arg2: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any; /*java.nio.file.Path*/
                static delete(arg0: any /*java.nio.file.Path*/): void;
                static deleteIfExists(
                    arg0: any /*java.nio.file.Path*/,
                ): boolean;
                static exists(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.LinkOption*/[],
                ): boolean;
                static find(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: int,
                    arg2: any /*java.util.function.BiPredicate*/,
                    arg3: any /*java.nio.file.FileVisitOption*/[],
                ): java.util.stream.Stream<any /*java.nio.file.Path*/>;
                static find(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: int,
                    arg2: any /*java.util.function.BiPredicate*/,
                    arg3: any /*java.nio.file.FileVisitOption*/[],
                    arg4: any /*java.nio.file.FileVisitor*/[],
                ): java.util.stream.Stream<any /*java.nio.file.Path*/>;
                static getAttribute(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.nio.file.LinkOption*/[],
                ): any /*java.lang.Object*/;
                static getAttribute(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                ): any /*java.lang.Object*/;
                static getPosixFilePermissions(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.LinkOption*/[],
                ): any /*java.util.Set*/;
                static getPosixFilePermissions(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.util.Set*/;
                static isDirectory(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.LinkOption*/[],
                ): boolean;
                static isDirectory(arg0: any /*java.nio.file.Path*/): boolean;
                static isExecutable(arg0: any /*java.nio.file.Path*/): boolean;
                static isHidden(arg0: any /*java.nio.file.Path*/): boolean;
                static isReadable(arg0: any /*java.nio.file.Path*/): boolean;
                static isRegularFile(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.LinkOption*/[],
                ): boolean;
                static isRegularFile(arg0: any /*java.nio.file.Path*/): boolean;
                static isSameFile(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.Path*/,
                ): boolean;
                static isSymbolicLink(
                    arg0: any /*java.nio.file.Path*/,
                ): boolean;
                static isWritable(arg0: any /*java.nio.file.Path*/): boolean;
                static lines(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.charset.Charset*/,
                ): any /*java.util.stream.Stream*/;
                static lines(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.util.stream.Stream*/;
                static list(
                    arg0: any /*java.nio.file.Path*/,
                ): java.util.stream.Stream<any /*java.nio.file.Path*/>;
                static move(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.Path*/,
                    arg2: any /*java.nio.file.CopyOption*/[],
                ): any /*java.nio.file.Path*/;
                static newBufferedReader(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.charset.Charset*/,
                ): any /*java.io.BufferedReader*/;
                static newBufferedReader(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.io.BufferedReader*/;
                static newBufferedWriter(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.charset.Charset*/,
                    arg2: any /*java.nio.file.OpenOption*/[],
                ): any /*java.io.BufferedWriter*/;
                static newBufferedWriter(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.OpenOption*/[],
                ): any /*java.io.BufferedWriter*/;
                static newByteChannel(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.OpenOption*/[],
                    arg2: any /*java.nio.file.attribute.FileAttribute*/[],
                ): any /*java.nio.channels.SeekableByteChannel*/;
                static newByteChannel(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.OpenOption*/[],
                ): any /*java.nio.channels.SeekableByteChannel*/;
                static readAllBytes(
                    arg0: any /*java.nio.file.Path*/,
                ): bytearray;
                static readAllLines(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.charset.Charset*/,
                ): java.util.List<string>;
                static readAllLines(
                    arg0: any /*java.nio.file.Path*/,
                ): java.util.List<string>;
                static readAttributes(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.nio.file.LinkOption*/[],
                ): any /*java.util.Map*/;
                static readAttributes(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                ): any /*java.util.Map*/;
                static readAttributes(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.nio.file.LinkOption*/[],
                ): any /*java.nio.file.attribute.BasicFileAttributes*/;
                static readSymbolicLink(
                    arg0: any /*java.nio.file.Path*/,
                ): any /*java.nio.file.Path*/;
                static setAttribute(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.lang.Object*/,
                    arg3: any /*java.nio.file.LinkOption*/[],
                ): void;
                static setAttribute(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: string,
                    arg2: any /*java.lang.Object*/,
                ): void;
                static setPosixFilePermissions(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.util.Set*/,
                ): any /*java.nio.file.Path*/;
                static size(arg0: any /*java.nio.file.Path*/): long;
                static walk(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.nio.file.FileVisitOption*/[],
                    arg2: int,
                    arg3: any /*java.nio.file.FileVisitor*/[],
                ): any /*java.util.stream.Stream*/;
                static walk(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: int,
                    arg2: any /*java.nio.file.FileVisitOption*/[],
                    arg3: any /*java.nio.file.FileVisitor*/[],
                ): any /*java.util.stream.Stream*/;
                static walk(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: int,
                    arg2: any /*java.nio.file.FileVisitOption*/[],
                ): any /*java.util.stream.Stream*/;
                static write(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.lang.Iterable*/,
                    arg2: any /*java.nio.charset.Charset*/,
                    arg3: any /*java.nio.file.OpenOption*/[],
                ): any /*java.nio.file.Path*/;
                static write(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.lang.Iterable*/,
                    arg2: any /*java.nio.file.OpenOption*/[],
                ): any /*java.nio.file.Path*/;
                static write(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.lang.Iterable*/,
                    arg2: any /*java.nio.charset.Charset*/,
                    arg3: any /*java.nio.file.OpenOption*/[],
                ): any /*java.nio.file.Path*/;
                static write(
                    arg0: any /*java.nio.file.Path*/,
                    arg1: any /*java.lang.Iterable*/,
                    arg2: any /*java.nio.file.OpenOption*/[],
                ): any /*java.nio.file.Path*/;
            }
        }
    }

    namespace java.util.stream {
        interface Stream<T> /* extends BaseStream<T, any>*/ {
            allMatch(arg0: Predicate<T>): boolean;
            anyMatch(arg0: Predicate<T>): boolean;
            close(): void;
            collect<R>(
                arg0: Supplier<R>,
                arg1: BiConsumer<R, T>,
                arg2: BiConsumer<R, R>,
            ): R;
            collect<R>(arg0: any /*java.util.stream.Collector*/): R;
            count(): long;
            distinct(): Stream<T>;
            filter(arg0: Predicate<T>): Stream<T>;
            findAny(): java.util.Optional<T>;
            findFirst(): java.util.Optional<T>;
            flatMap<R>(arg0: Func<T, Stream<R>>): Stream<R>;
            flatMapToDouble(
                arg0: Func<T, any /*java.util.stream.DoubleStream*/>,
            ): any /*java.util.stream.DoubleStream*/;
            flatMapToInt(
                arg0: Func<T, any /*java.util.stream.IntStream*/>,
            ): any /*java.util.stream.IntStream*/;
            flatMapToLong(
                arg0: Func<T, any /*java.util.stream.LongStream*/>,
            ): any /*java.util.stream.LongStream*/;
            forEach(arg0: Consumer<T>): void;
            forEachOrdered(arg0: Consumer<T>): void;
            isParallel(): boolean;
            iterator(): java.util.Iterator<T>;
            limit(arg0: long): Stream<T>;
            map<R>(arg0: Func<T, R>): Stream<R>;
            mapToDouble(
                arg0: any /*java.util.function.ToDoubleFunction*/,
            ): any /*java.util.stream.DoubleStream*/;
            mapToInt(
                arg0: any /*java.util.function.ToIntFunction*/,
            ): any /*java.util.stream.IntStream*/;
            mapToLong(
                arg0: any /*java.util.function.ToLongFunction*/,
            ): any /*java.util.stream.LongStream*/;
            max(arg0: any /*java.util.Comparator*/): java.util.Optional<T>;
            min(arg0: any /*java.util.Comparator*/): java.util.Optional<T>;
            noneMatch(arg0: Predicate<T>): boolean;
            onClose<S>(arg0: java.lang.Runnable): S;
            parallel<S>(): S;
            peek(arg0: Consumer<T>): Stream<T>;
            reduce(arg0: BinaryOperator<T>): java.util.Optional<T>;
            reduce(arg0: T, arg1: BinaryOperator<T>): T;
            reduce<U>(
                arg0: U,
                arg1: BiFunction<U, T, U>,
                arg2: BinaryOperator<U>,
            ): U;
            sequential<S>(): S;
            skip(arg0: long): Stream<T>;
            sorted(): Stream<T>;
            sorted(arg0: any /*java.util.Comparator*/): Stream<T>;
            spliterator(): any /*java.util.Spliterator*/;
            toArray(): [any /*java.lang.Object*/];
            toArray<A>(arg0: any /*java.util.function.IntFunction*/): [A];
            unordered<S>(): S;
        }

        class Collectors /* extends java.lang.Object*/ {
            equals(arg0: any /*java.lang.Object*/): boolean;
            toString(): string;
        }
    }

    namespace java.net {
        class URI /* extends Object implements Comparable<URI>, Serializable*/ {
            compareTo(arg0: any /*java.lang.Object*/): int;
            equals(arg0: any /*java.lang.Object*/): boolean;
            getAuthority(): string;
            getFragment(): string;
            getHost(): string;
            getPath(): string;
            getPort(): int;
            getQuery(): string;
            getRawAuthority(): string;
            getRawFragment(): string;
            getRawPath(): string;
            getRawQuery(): string;
            getRawSchemeSpecificPart(): string;
            getRawUserInfo(): string;
            getScheme(): string;
            getSchemeSpecificPart(): string;
            getUserInfo(): string;
            hashCode(): int;
            normalize(): any /*java.net.URI*/;
            parseServerAuthority(): any /*java.net.URI*/;
            relativize(arg0: any /*java.net.URI*/): any /*java.net.URI*/;
            resolve(arg0: any /*java.net.URI*/): any /*java.net.URI*/;
            resolve(arg0: string): any /*java.net.URI*/;
            resolve(arg0: string): any /*java.net.URI*/;
            toASCIIString(): string;
            toString(): string;
            toURL(): java.net.URL;
        }

        class URL /* extends Object implements Serializable*/ {
            constructor(arg0: string);
        }
    }

    interface Supplier<T> /*java.util.function.Supplier*/ {
        (): T;
    }

    interface BiConsumer<T, U> /*java.util.function.BiConsumer*/ {
        (arg0: T, arg1: U): void;
        andThen?(arg0: BiConsumer<T, U>): BiConsumer<T, U>;
    }

    interface Consumer<T> /*java.util.function.Consumer*/ {
        (arg0: T): void;
        andThen?(arg0: Consumer<T>): Consumer<T>;
    }

    interface BiPredicate<T, U> /*java.util.function.BiPredicate*/ {
        (arg0: T, arg1: U): boolean;
        and?(arg0: BiPredicate<T, U>): BiPredicate<T, U>;
        negate?(): BiPredicate<T, U>;
        or?(arg0: BiPredicate<T, U>): BiPredicate<T, U>;
    }

    interface Func<T, R> /*java.util.function.Function*/ {
        (arg0: T): R;
        // static identity<T>(  ):Func<T, T>;
        andThen?<V>(arg0: Func<R, V>): Func<T, V>;
        compose?<V>(arg0: Func<V, T>): Func<V, R>;
    }

    interface Predicate<T> /*java.util.function.Predicate*/ {
        (arg0: T): boolean;
        // static isEqual<T>( arg0:any /*java.lang.Object*/ ):Predicate<T>;
        and?(arg0: Predicate<T>): Predicate<T>;
        negate?(): Predicate<T>;
        or?(arg0: Predicate<T>): Predicate<T>;
    }

    interface BiFunction<T, U, R> /*java.util.function.BiFunction*/ {
        (arg0: T, arg1: U): R;
        andThen?<V>(arg0: Func<R, V>): BiFunction<T, U, V>;
    }

    interface BinaryOperator<
        T,
    > /*java.util.function.BinaryOperator extends BiFunction<T, any, any>*/ {
        <R, U>(arg0: T, arg1: U): R;
        // static maxBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
        // static minBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
        andThen?<R, U, V>(arg0: Func<R, V>): BiFunction<T, U, V>;
    }

    interface UnaryOperator<
        T,
    > /*java.util.function.UnaryOperator extends Function<T, any>*/ {
        <R>(arg0: T): R;
        // static identity<T>(  ):UnaryOperator<T>;
        andThen?<R, V>(arg0: Func<R, V>): Func<T, V>;
        compose?<R, V>(arg0: Func<V, T>): Func<V, R>;
    }
}
