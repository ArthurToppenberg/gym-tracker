module.exports = {

"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMutationKey": (()=>getMutationKey),
    "getMutationKeyInternal": (()=>getMutationKeyInternal),
    "getQueryKey": (()=>getQueryKey),
    "getQueryKeyInternal": (()=>getQueryKeyInternal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.79.0/node_modules/@tanstack/query-core/build/modern/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/utils.mjs [app-ssr] (ecmascript)");
;
;
/**
 * To allow easy interactions with groups of related queries, such as
 * invalidating all queries of a router, we use an array as the path when
 * storing in tanstack query.
 **/ function getQueryKeyInternal(path, input, type) {
    // Construct a query key that is easy to destructure and flexible for
    // partial selecting etc.
    // https://github.com/trpc/trpc/issues/3128
    // some parts of the path may be dot-separated, split them up
    const splitPath = path.flatMap((part)=>part.split('.'));
    if (!input && (!type || type === 'any')) {
        // this matches also all mutations (see `getMutationKeyInternal`)
        // for `utils.invalidate()` to match all queries (including vanilla react-query)
        // we don't want nested array if path is empty, i.e. `[]` instead of `[[]]`
        return splitPath.length ? [
            splitPath
        ] : [];
    }
    if (type === 'infinite' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isObject"])(input) && ('direction' in input || 'cursor' in input)) {
        const { cursor: _, direction: __, ...inputWithoutCursorAndDirection } = input;
        return [
            splitPath,
            {
                input: inputWithoutCursorAndDirection,
                type: 'infinite'
            }
        ];
    }
    return [
        splitPath,
        {
            ...typeof input !== 'undefined' && input !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"] && {
                input: input
            },
            ...type && type !== 'any' && {
                type: type
            }
        }
    ];
}
function getMutationKeyInternal(path) {
    return getQueryKeyInternal(path, undefined, 'any');
}
/**
 * Method to extract the query key for a procedure
 * @param procedureOrRouter - procedure or AnyRouter
 * @param input - input to procedureOrRouter
 * @param type - defaults to `any`
 * @see https://trpc.io/docs/v11/getQueryKey
 */ function getQueryKey(procedureOrRouter, ..._params) {
    const [input, type] = _params;
    // @ts-expect-error - we don't expose _def on the type layer
    const path = procedureOrRouter._def().path;
    const queryKey = getQueryKeyInternal(path, input, type ?? 'any');
    return queryKey;
}
/**
 * Method to extract the mutation key for a procedure
 * @param procedure - procedure
 * @see https://trpc.io/docs/v11/getQueryKey#mutations
 */ function getMutationKey(procedure) {
    // @ts-expect-error - we don't expose _def on the type layer
    const path = procedure._def().path;
    return getMutationKeyInternal(path);
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/decorationProxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createReactDecoration": (()=>createReactDecoration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/createProxy.mjs [app-ssr] (ecmascript)");
;
/**
 * Create proxy for decorating procedures
 * @internal
 */ function createReactDecoration(hooks) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRecursiveProxy"])(({ path, args })=>{
        const pathCopy = [
            ...path
        ];
        // The last arg is for instance `.useMutation` or `.useQuery()`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastArg = pathCopy.pop();
        if (lastArg === 'useMutation') {
            return hooks[lastArg](pathCopy, ...args);
        }
        if (lastArg === '_def') {
            return {
                path: pathCopy
            };
        }
        const [input, ...rest] = args;
        const opts = rest[0] ?? {};
        return hooks[lastArg](pathCopy, input, opts);
    });
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/context.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TRPCContext": (()=>TRPCContext),
    "contextProps": (()=>contextProps)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.3_@babel+core@7.27.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const contextProps = [
    'client',
    'ssrContext',
    'ssrState',
    'abortOnUnmount'
];
const TRPCContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]?.(null);
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/utilsProxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createQueryUtilsProxy": (()=>createQueryUtilsProxy),
    "createReactQueryUtils": (()=>createReactQueryUtils),
    "getQueryType": (()=>getQueryType)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/createTRPCClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/createProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)");
;
;
;
;
const getQueryType = (utilName)=>{
    switch(utilName){
        case 'queryOptions':
        case 'fetch':
        case 'ensureData':
        case 'prefetch':
        case 'getData':
        case 'setData':
        case 'setQueriesData':
            return 'query';
        case 'infiniteQueryOptions':
        case 'fetchInfinite':
        case 'prefetchInfinite':
        case 'getInfiniteData':
        case 'setInfiniteData':
            return 'infinite';
        case 'setMutationDefaults':
        case 'getMutationDefaults':
        case 'isMutating':
        case 'cancel':
        case 'invalidate':
        case 'refetch':
        case 'reset':
            return 'any';
    }
};
/**
 * @internal
 */ function createRecursiveUtilsProxy(context) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRecursiveProxy"])((opts)=>{
        const path = [
            ...opts.path
        ];
        const utilName = path.pop();
        const args = [
            ...opts.args
        ];
        const input = args.shift(); // args can now be spread when input removed
        const queryType = getQueryType(utilName);
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, queryType);
        const contextMap = {
            infiniteQueryOptions: ()=>context.infiniteQueryOptions(path, queryKey, args[0]),
            queryOptions: ()=>context.queryOptions(path, queryKey, ...args),
            /**
       * DecorateQueryProcedure
       */ fetch: ()=>context.fetchQuery(queryKey, ...args),
            fetchInfinite: ()=>context.fetchInfiniteQuery(queryKey, args[0]),
            prefetch: ()=>context.prefetchQuery(queryKey, ...args),
            prefetchInfinite: ()=>context.prefetchInfiniteQuery(queryKey, args[0]),
            ensureData: ()=>context.ensureQueryData(queryKey, ...args),
            invalidate: ()=>context.invalidateQueries(queryKey, ...args),
            reset: ()=>context.resetQueries(queryKey, ...args),
            refetch: ()=>context.refetchQueries(queryKey, ...args),
            cancel: ()=>context.cancelQuery(queryKey, ...args),
            setData: ()=>{
                context.setQueryData(queryKey, args[0], args[1]);
            },
            setQueriesData: ()=>context.setQueriesData(queryKey, args[0], args[1], args[2]),
            setInfiniteData: ()=>{
                context.setInfiniteQueryData(queryKey, args[0], args[1]);
            },
            getData: ()=>context.getQueryData(queryKey),
            getInfiniteData: ()=>context.getInfiniteQueryData(queryKey),
            /**
       * DecorateMutationProcedure
       */ setMutationDefaults: ()=>context.setMutationDefaults((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMutationKeyInternal"])(path), input),
            getMutationDefaults: ()=>context.getMutationDefaults((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMutationKeyInternal"])(path)),
            isMutating: ()=>context.isMutating({
                    mutationKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMutationKeyInternal"])(path)
                })
        };
        return contextMap[utilName]();
    });
}
/**
 * @internal
 */ function createReactQueryUtils(context) {
    const clientProxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTRPCClientProxy"])(context.client);
    const proxy = createRecursiveUtilsProxy(context);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFlatProxy"])((key)=>{
        const contextName = key;
        if (contextName === 'client') {
            return clientProxy;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contextProps"].includes(contextName)) {
            return context[contextName];
        }
        return proxy[key];
    });
}
/**
 * @internal
 */ function createQueryUtilsProxy(context) {
    return createRecursiveUtilsProxy(context);
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getClientArgs.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @internal
 */ __turbopack_context__.s({
    "getClientArgs": (()=>getClientArgs)
});
function getClientArgs(queryKey, opts, infiniteParams) {
    const path = queryKey[0];
    let input = queryKey[1]?.input;
    if (infiniteParams) {
        input = {
            ...input ?? {},
            ...infiniteParams.pageParam ? {
                cursor: infiniteParams.pageParam
            } : {},
            direction: infiniteParams.direction
        };
    }
    return [
        path.join('.'),
        input,
        opts?.trpc
    ];
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/trpcResult.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "buildQueryFromAsyncIterable": (()=>buildQueryFromAsyncIterable),
    "createTRPCOptionsResult": (()=>createTRPCOptionsResult),
    "useHookResult": (()=>useHookResult)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.3_@babel+core@7.27.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function createTRPCOptionsResult(value) {
    const path = value.path.join('.');
    return {
        path
    };
}
/**
 * Makes a stable reference of the `trpc` prop
 */ function useHookResult(value) {
    const result = createTRPCOptionsResult(value);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>result, [
        result
    ]);
}
/**
 * @internal
 */ async function buildQueryFromAsyncIterable(asyncIterable, queryClient, queryKey) {
    const queryCache = queryClient.getQueryCache();
    const query = queryCache.build(queryClient, {
        queryKey
    });
    query.setState({
        data: [],
        status: 'success'
    });
    const aggregate = [];
    for await (const value of asyncIterable){
        aggregate.push(value);
        query.setState({
            data: [
                ...aggregate
            ]
        });
    }
    return aggregate;
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/utils/createUtilityFunctions.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createUtilityFunctions": (()=>createUtilityFunctions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.79.0/node_modules/@tanstack/query-core/build/modern/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$queryOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/queryOptions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$infiniteQueryOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/infiniteQueryOptions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/internals/TRPCUntypedClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/createTRPCClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getClientArgs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/trpcResult.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * Creates a set of utility functions that can be used to interact with `react-query`
 * @param opts the `TRPCClient` and `QueryClient` to use
 * @returns a set of utility functions that can be used to interact with `react-query`
 * @internal
 */ function createUtilityFunctions(opts) {
    const { client, queryClient } = opts;
    const untypedClient = client instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRPCUntypedClient"] ? client : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUntypedClient"])(client);
    return {
        infiniteQueryOptions: (path, queryKey, opts)=>{
            const inputIsSkipToken = queryKey[1]?.input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
            const queryFn = async (queryFnContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...opts?.trpc?.abortOnUnmount ? {
                            signal: queryFnContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts, {
                    direction: queryFnContext.direction,
                    pageParam: queryFnContext.pageParam
                }));
                return result;
            };
            return Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$infiniteQueryOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["infiniteQueryOptions"])({
                ...opts,
                initialData: opts?.initialData,
                queryKey,
                queryFn: inputIsSkipToken ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"] : queryFn,
                initialPageParam: opts?.initialCursor ?? null
            }), {
                trpc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTRPCOptionsResult"])({
                    path
                })
            });
        },
        queryOptions: (path, queryKey, opts)=>{
            const inputIsSkipToken = queryKey[1]?.input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
            const queryFn = async (queryFnContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...opts?.trpc?.abortOnUnmount ? {
                            signal: queryFnContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts));
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAsyncIterable"])(result)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildQueryFromAsyncIterable"])(result, queryClient, queryKey);
                }
                return result;
            };
            return Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$queryOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queryOptions"])({
                ...opts,
                initialData: opts?.initialData,
                queryKey,
                queryFn: inputIsSkipToken ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"] : queryFn
            }), {
                trpc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTRPCOptionsResult"])({
                    path
                })
            });
        },
        fetchQuery: (queryKey, opts)=>{
            return queryClient.fetchQuery({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, opts))
            });
        },
        fetchInfiniteQuery: (queryKey, opts)=>{
            return queryClient.fetchInfiniteQuery({
                ...opts,
                queryKey,
                queryFn: ({ pageParam, direction })=>{
                    return untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, opts, {
                        pageParam,
                        direction
                    }));
                },
                initialPageParam: opts?.initialCursor ?? null
            });
        },
        prefetchQuery: (queryKey, opts)=>{
            return queryClient.prefetchQuery({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, opts))
            });
        },
        prefetchInfiniteQuery: (queryKey, opts)=>{
            return queryClient.prefetchInfiniteQuery({
                ...opts,
                queryKey,
                queryFn: ({ pageParam, direction })=>{
                    return untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, opts, {
                        pageParam,
                        direction
                    }));
                },
                initialPageParam: opts?.initialCursor ?? null
            });
        },
        ensureQueryData: (queryKey, opts)=>{
            return queryClient.ensureQueryData({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, opts))
            });
        },
        invalidateQueries: (queryKey, filters, options)=>{
            return queryClient.invalidateQueries({
                ...filters,
                queryKey
            }, options);
        },
        resetQueries: (queryKey, filters, options)=>{
            return queryClient.resetQueries({
                ...filters,
                queryKey
            }, options);
        },
        refetchQueries: (queryKey, filters, options)=>{
            return queryClient.refetchQueries({
                ...filters,
                queryKey
            }, options);
        },
        cancelQuery: (queryKey, options)=>{
            return queryClient.cancelQueries({
                queryKey
            }, options);
        },
        setQueryData: (queryKey, updater, options)=>{
            return queryClient.setQueryData(queryKey, updater, options);
        },
        // eslint-disable-next-line max-params
        setQueriesData: (queryKey, filters, updater, options)=>{
            return queryClient.setQueriesData({
                ...filters,
                queryKey
            }, updater, options);
        },
        getQueryData: (queryKey)=>{
            return queryClient.getQueryData(queryKey);
        },
        setInfiniteQueryData: (queryKey, updater, options)=>{
            return queryClient.setQueryData(queryKey, updater, options);
        },
        getInfiniteQueryData: (queryKey)=>{
            return queryClient.getQueryData(queryKey);
        },
        setMutationDefaults: (mutationKey, options)=>{
            const path = mutationKey[0];
            const canonicalMutationFn = (input)=>{
                return untypedClient.mutation(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])([
                    path,
                    {
                        input
                    }
                ], opts));
            };
            return queryClient.setMutationDefaults(mutationKey, typeof options === 'function' ? options({
                canonicalMutationFn
            }) : options);
        },
        getMutationDefaults: (mutationKey)=>{
            return queryClient.getMutationDefaults(mutationKey);
        },
        isMutating: (filters)=>{
            return queryClient.isMutating({
                ...filters,
                exact: true
            });
        }
    };
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/useQueriesProxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createUseQueries": (()=>createUseQueries)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/internals/TRPCUntypedClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/createTRPCClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/createProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * Create proxy for `useQueries` options
 * @internal
 */ function createUseQueries(client) {
    const untypedClient = client instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRPCUntypedClient"] ? client : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUntypedClient"])(client);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRecursiveProxy"])((opts)=>{
        const arrayPath = opts.path;
        const dotPath = arrayPath.join('.');
        const [input, _opts] = opts.args;
        const options = {
            queryKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(arrayPath, input, 'query'),
            queryFn: ()=>{
                return untypedClient.query(dotPath, input, _opts?.trpc);
            },
            ..._opts
        };
        return options;
    });
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/hooks/createHooksInternal.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createRootHooks": (()=>createRootHooks)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useSuspenseInfiniteQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$usePrefetchInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/usePrefetchInfiniteQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.79.0/node_modules/@tanstack/query-core/build/modern/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useSuspenseQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useSuspenseQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$usePrefetchQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/usePrefetchQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.79.0_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/createTRPCClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/internals/TRPCUntypedClient.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.3_@babel+core@7.27.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getClientArgs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/trpcResult.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$utils$2f$createUtilityFunctions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/utils/createUtilityFunctions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$useQueriesProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/useQueriesProxy.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// TODO: Look into fixing react-compiler support
const trackResult = (result, onTrackResult)=>{
    const trackedResult = new Proxy(result, {
        get (target, prop) {
            onTrackResult(prop);
            return target[prop];
        }
    });
    return trackedResult;
};
/**
 * @internal
 */ function createRootHooks(config) {
    const mutationSuccessOverride = config?.overrides?.useMutation?.onSuccess ?? ((options)=>options.originalFn());
    const Context = config?.context ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRPCContext"];
    const createClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTRPCClient"];
    const TRPCProvider = (props)=>{
        const { abortOnUnmount = false, queryClient, ssrContext } = props;
        const [ssrState, setSSRState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(props.ssrState ?? false);
        const client = props.client instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$internals$2f$TRPCUntypedClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRPCUntypedClient"] ? props.client : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$createTRPCClient$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUntypedClient"])(props.client);
        const fns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$utils$2f$createUtilityFunctions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUtilityFunctions"])({
                client,
                queryClient
            }), [
            client,
            queryClient
        ]);
        const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
                abortOnUnmount,
                queryClient,
                client,
                ssrContext: ssrContext ?? null,
                ssrState,
                ...fns
            }), [
            abortOnUnmount,
            client,
            fns,
            queryClient,
            ssrContext,
            ssrState
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            // Only updating state to `mounted` if we are using SSR.
            // This makes it so we don't have an unnecessary re-render when opting out of SSR.
            setSSRState((state)=>state ? 'mounted' : false);
        }, []);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Context.Provider, {
            value: contextValue
        }, props.children);
    };
    function useContext() {
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(Context);
        if (!context) {
            throw new Error('Unable to find tRPC Context. Did you forget to wrap your App inside `withTRPC` HoC?');
        }
        return context;
    }
    /**
   * Hack to make sure errors return `status`='error` when doing SSR
   * @see https://github.com/trpc/trpc/pull/1645
   */ function useSSRQueryOptionsIfNeeded(queryKey, opts) {
        const { queryClient, ssrState } = useContext();
        return ssrState && ssrState !== 'mounted' && queryClient.getQueryCache().find({
            queryKey
        })?.state.status === 'error' ? {
            retryOnMount: false,
            ...opts
        } : opts;
    }
    function useQuery$1(path, input, opts) {
        const context = useContext();
        const { abortOnUnmount, client, ssrState, queryClient, prefetchQuery } = context;
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'query');
        const defaultOpts = queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
        if (typeof window === 'undefined' && ssrState === 'prepass' && opts?.trpc?.ssr !== false && (opts?.enabled ?? defaultOpts?.enabled) !== false && !isInputSkipToken && !queryClient.getQueryCache().find({
            queryKey
        })) {
            void prefetchQuery(queryKey, opts);
        }
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? abortOnUnmount;
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
            ...ssrOpts,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : async (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts));
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAsyncIterable"])(result)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildQueryFromAsyncIterable"])(result, queryClient, queryKey);
                }
                return result;
            }
        }, queryClient);
        hook.trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHookResult"])({
            path
        });
        return hook;
    }
    function usePrefetchQuery$1(path, input, opts) {
        const context = useContext();
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'query');
        const isInputSkipToken = input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? context.abortOnUnmount;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$usePrefetchQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrefetchQuery"])({
            ...opts,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    trpc: {
                        ...opts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts));
            }
        });
    }
    function useSuspenseQuery$1(path, input, opts) {
        const context = useContext();
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'query');
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? context.abortOnUnmount;
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSuspenseQuery"])({
            ...opts,
            queryKey: queryKey,
            queryFn: (queryFunctionContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                return context.client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts));
            }
        }, context.queryClient);
        hook.trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHookResult"])({
            path
        });
        return [
            hook.data,
            hook
        ];
    }
    function useMutation$1(path, opts) {
        const { client, queryClient } = useContext();
        const mutationKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMutationKeyInternal"])(path);
        const defaultOpts = queryClient.defaultMutationOptions(queryClient.getMutationDefaults(mutationKey));
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
            ...opts,
            mutationKey: mutationKey,
            mutationFn: (input)=>{
                return client.mutation(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])([
                    path,
                    {
                        input
                    }
                ], opts));
            },
            onSuccess (...args) {
                const originalFn = ()=>opts?.onSuccess?.(...args) ?? defaultOpts?.onSuccess?.(...args);
                return mutationSuccessOverride({
                    originalFn,
                    queryClient,
                    meta: opts?.meta ?? defaultOpts?.meta ?? {}
                });
            }
        }, queryClient);
        hook.trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHookResult"])({
            path
        });
        return hook;
    }
    const initialStateIdle = {
        data: undefined,
        error: null,
        status: 'idle'
    };
    const initialStateConnecting = {
        data: undefined,
        error: null,
        status: 'connecting'
    };
    /* istanbul ignore next -- @preserve */ function useSubscription(path, input, opts) {
        const enabled = opts?.enabled ?? input !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashKey"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'any'));
        const { client } = useContext();
        const optsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(opts);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            optsRef.current = opts;
        });
        const [trackedProps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set([]));
        const addTrackedProp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
            trackedProps.add(key);
        }, [
            trackedProps
        ]);
        const currentSubscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
        const updateState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((callback)=>{
            const prev = resultRef.current;
            const next = resultRef.current = callback(prev);
            let shouldUpdate = false;
            for (const key of trackedProps){
                if (prev[key] !== next[key]) {
                    shouldUpdate = true;
                    break;
                }
            }
            if (shouldUpdate) {
                setState(trackResult(next, addTrackedProp));
            }
        }, [
            addTrackedProp,
            trackedProps
        ]);
        const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
            // unsubscribe from the previous subscription
            currentSubscriptionRef.current?.unsubscribe();
            if (!enabled) {
                updateState(()=>({
                        ...initialStateIdle,
                        reset
                    }));
                return;
            }
            updateState(()=>({
                    ...initialStateConnecting,
                    reset
                }));
            const subscription = client.subscription(path.join('.'), input ?? undefined, {
                onStarted: ()=>{
                    optsRef.current.onStarted?.();
                    updateState((prev)=>({
                            ...prev,
                            status: 'pending',
                            error: null
                        }));
                },
                onData: (data)=>{
                    optsRef.current.onData?.(data);
                    updateState((prev)=>({
                            ...prev,
                            status: 'pending',
                            data,
                            error: null
                        }));
                },
                onError: (error)=>{
                    optsRef.current.onError?.(error);
                    updateState((prev)=>({
                            ...prev,
                            status: 'error',
                            error
                        }));
                },
                onConnectionStateChange: (result)=>{
                    updateState((prev)=>{
                        switch(result.state){
                            case 'idle':
                                return {
                                    ...prev,
                                    status: result.state,
                                    error: null,
                                    data: undefined
                                };
                            case 'connecting':
                                return {
                                    ...prev,
                                    error: result.error,
                                    status: result.state
                                };
                            case 'pending':
                                // handled when data is / onStarted
                                return prev;
                        }
                    });
                },
                onComplete: ()=>{
                    optsRef.current.onComplete?.();
                    // In the case of WebSockets, the connection might not be idle so `onConnectionStateChange` will not be called until the connection is closed.
                    // In this case, we need to set the state to idle manually.
                    updateState((prev)=>({
                            ...prev,
                            status: 'idle',
                            error: null,
                            data: undefined
                        }));
                // (We might want to add a `connectionState` to the state to track the connection state separately)
                }
            });
            currentSubscriptionRef.current = subscription;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            client,
            queryKey,
            enabled,
            updateState
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            reset();
            return ()=>{
                currentSubscriptionRef.current?.unsubscribe();
            };
        }, [
            reset
        ]);
        const resultRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(enabled ? {
            ...initialStateConnecting,
            reset
        } : {
            ...initialStateIdle,
            reset
        });
        const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(trackResult(resultRef.current, addTrackedProp));
        return state;
    }
    function useInfiniteQuery$1(path, input, opts) {
        const { client, ssrState, prefetchInfiniteQuery, queryClient, abortOnUnmount } = useContext();
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'infinite');
        const defaultOpts = queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
        if (typeof window === 'undefined' && ssrState === 'prepass' && opts?.trpc?.ssr !== false && (opts?.enabled ?? defaultOpts?.enabled) !== false && !isInputSkipToken && !queryClient.getQueryCache().find({
            queryKey
        })) {
            void prefetchInfiniteQuery(queryKey, {
                ...defaultOpts,
                ...opts
            });
        }
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? abortOnUnmount;
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
            ...ssrOpts,
            initialPageParam: opts.initialCursor ?? null,
            persister: opts.persister,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                return client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        }, queryClient);
        hook.trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHookResult"])({
            path
        });
        return hook;
    }
    function usePrefetchInfiniteQuery$1(path, input, opts) {
        const context = useContext();
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'infinite');
        const defaultOpts = context.queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$79$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipToken"];
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? context.abortOnUnmount;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$usePrefetchInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrefetchInfiniteQuery"])({
            ...opts,
            initialPageParam: opts.initialCursor ?? null,
            queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        });
    }
    function useSuspenseInfiniteQuery$1(path, input, opts) {
        const context = useContext();
        const queryKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryKeyInternal"])(path, input, 'infinite');
        const defaultOpts = context.queryClient.getQueryDefaults(queryKey);
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? context.abortOnUnmount;
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSuspenseInfiniteQuery"])({
            ...opts,
            initialPageParam: opts.initialCursor ?? null,
            queryKey,
            queryFn: (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getClientArgs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientArgs"])(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        }, context.queryClient);
        hook.trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$trpcResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHookResult"])({
            path
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [
            hook.data,
            hook
        ];
    }
    const useQueries$1 = (queriesCallback, options)=>{
        const { ssrState, queryClient, prefetchQuery, client } = useContext();
        const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$useQueriesProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUseQueries"])(client);
        const queries = queriesCallback(proxy);
        if (typeof window === 'undefined' && ssrState === 'prepass') {
            for (const query of queries){
                const queryOption = query;
                if (queryOption.trpc?.ssr !== false && !queryClient.getQueryCache().find({
                    queryKey: queryOption.queryKey
                })) {
                    void prefetchQuery(queryOption.queryKey, queryOption);
                }
            }
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueries"])({
            queries: queries.map((query)=>({
                    ...query,
                    queryKey: query.queryKey
                })),
            combine: options?.combine
        }, queryClient);
    };
    const useSuspenseQueries$1 = (queriesCallback)=>{
        const { queryClient, client } = useContext();
        const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$useQueriesProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUseQueries"])(client);
        const queries = queriesCallback(proxy);
        const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useSuspenseQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSuspenseQueries"])({
            queries: queries.map((query)=>({
                    ...query,
                    queryFn: query.queryFn,
                    queryKey: query.queryKey
                }))
        }, queryClient);
        return [
            hook.map((h)=>h.data),
            hook
        ];
    };
    return {
        Provider: TRPCProvider,
        createClient,
        useContext,
        useUtils: useContext,
        useQuery: useQuery$1,
        usePrefetchQuery: usePrefetchQuery$1,
        useSuspenseQuery: useSuspenseQuery$1,
        useQueries: useQueries$1,
        useSuspenseQueries: useSuspenseQueries$1,
        useMutation: useMutation$1,
        useSubscription,
        useInfiniteQuery: useInfiniteQuery$1,
        usePrefetchInfiniteQuery: usePrefetchInfiniteQuery$1,
        useSuspenseInfiniteQuery: useSuspenseInfiniteQuery$1
    };
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCReact.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createHooksInternal": (()=>createHooksInternal),
    "createTRPCReact": (()=>createTRPCReact)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import/createProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.3_@babel+core@7.27.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$decorationProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/decorationProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$utilsProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/utilsProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$hooks$2f$createHooksInternal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/hooks/createHooksInternal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/context.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * @internal
 */ function createHooksInternal(trpc) {
    const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$decorationProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createReactDecoration"])(trpc);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2f$createProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFlatProxy"])((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = trpc.useUtils();
                // create a stable reference of the utils context
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$utilsProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createReactQueryUtils"])(context);
                }, [
                    context
                ]);
            };
        }
        if (trpc.hasOwnProperty(key)) {
            return trpc[key];
        }
        return proxy[key];
    });
}
function createTRPCReact(opts) {
    const hooks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$hooks$2f$createHooksInternal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRootHooks"])(opts);
    const proxy = createHooksInternal(hooks);
    return proxy;
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCQueryUtils.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createTRPCQueryUtils": (()=>createTRPCQueryUtils)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$unstable$2d$core$2d$do$2d$not$2d$import$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.1.4_typescript@5.8.3/node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$utilsProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/shared/proxy/utilsProxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$3_$40$babel$2b$core$40$7$2e$27$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.3_@babel+core@7.27.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$utils$2f$createUtilityFunctions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/utils/createUtilityFunctions.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function createTRPCQueryUtils(opts) {
    const utils = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$utils$2f$createUtilityFunctions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUtilityFunctions"])(opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$shared$2f$proxy$2f$utilsProxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createQueryUtilsProxy"])(utils);
}
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/index.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCReact$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCReact.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCQueryUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCQueryUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
}}),
"[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$client$40$11$2e$1$2e$4_$40$trpc$2b$server$40$11$2e$1$2e$4_typescript$40$5$2e$8$2e$3_$5f$typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+client@11.1.4_@trpc+server@11.1.4_typescript@5.8.3__typescript@5.8.3/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$internals$2f$getQueryKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/internals/getQueryKey.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCReact$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCReact.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCQueryUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/createTRPCQueryUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$react$2d$query$40$11$2e$1$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$79$2e$0_react$40$19$2e$1$2e$0_$5f40$trpc$2b$client$40$11$2e$1$2e$4_57091c98065ea778d78987fcd366f4c3$2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+react-query@11.1.4_@tanstack+react-query@5.79.0_react@19.1.0__@trpc+client@11.1.4_57091c98065ea778d78987fcd366f4c3/node_modules/@trpc/react-query/dist/index.mjs [app-ssr] (ecmascript) <locals>");
}}),

};

//# sourceMappingURL=9ef3f_%40trpc_react-query_dist_9f55f062._.js.map