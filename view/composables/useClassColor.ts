export function  useClassColor() {

    function classBgColor(color: string) {
        return {
            'blue' : 'bg-blue-500',
            'red' : 'bg-red-500',
            'green' : 'bg-green-500',
            'orange' : 'bg-orange-500',
            'yellow' : 'bg-yellow-500',
            'lime' : 'bg-lime-500',
            'indigo' : 'bg-indigo-500',
            'violet' : 'bg-violet-500',
            'cyan' : 'bg-cyan-500',
        } [ color ];
    }

    function classBgColorHover(color: string) {
        return {
            'blue' : 'hover:bg-blue-700',
            'red' : 'hover:bg-red-700',
            'green' : 'hover:bg-green-700',
            'orange' : 'hover:bg-orange-700',
            'yellow' : 'hover:bg-yellow-700',
            'lime' : 'hover:bg-lime-700',
            'indigo' : 'hover:bg-indigo-700',
            'violet' : 'hover:bg-violet-700',
            'cyan' : 'hover:bg-cyan-700',
        } [ color ];
    }

    function classTextColor(color: string) {
        return {
            'blue' : 'text-blue-500',
            'red' : 'text-red-500',
            'green' : 'text-green-500',
            'orange' : 'text-orange-500',
            'yellow' : 'text-yellow-600',
            'lime' : 'text-lime-500',
            'indigo' : 'text-indigo-500',
            'violet' : 'text-violet-500',
            'cyan' : 'text-cyan-500',
        } [ color ];
    }

    function classTextColorHover(color: string) {
        return {
            'blue' : 'hover:text-blue-400',
            'red' : 'hover:text-red-400',
            'green' : 'hover:text-green-400',
            'orange' : 'hover:text-orange-400',
            'yellow' : 'hover:text-yellow-400',
            'lime' : 'hover:text-lime-400',
            'indigo' : 'hover:text-indigo-400',
            'violet' : 'hover:text-violet-400',
            'cyan' : 'hover:text-cyan-400',
        } [ color ];
    }

    function classBorderColor(color: string) {
        return {
            'blue' : 'border-solid border-blue-500',
            'red' : 'border-solid border-red-500',
            'green' : 'border-solid border-green-500',
            'gray' : 'border-solid border-gray-500',
            'orange' : 'border-solid border-orange-500',
            'yellow' : 'border-solid border-yellow-500',
            'lime' : 'border-solid border-lime-500',
            'indigo' : 'border-solid border-indigo-500',
            'violet' : 'border-solid border-violet-500',
            'cyan' : 'border-solid border-cyan-500',
        } [ color ];
    }

    function classBorderColorHover(color: string) {
        return {
            'blue' : 'hover:border-blue-400',
            'red' : 'hover:border-red-400',
            'green' : 'hover:border-green-400',
            'orange' : 'hover:border-orange-400',
            'yellow' : 'hover:border-yellow-400',
            'lime' : 'hover:border-lime-400',
            'indigo' : 'hover:border-indigo-400',
            'violet' : 'hover:border-violet-400',
            'cyan' : 'hover:border-cyan-400',
        } [ color ];
    }

    function classStatusColor(status: string) {
        return {
            'on' : 'text-blue-500',
            'off' : 'text-red-500',
            'waiting' : 'text-green-500',
        } [ status ];
    }

    return {
        classBgColor,
        classBgColorHover,
        classTextColor,
        classTextColorHover,
        classBorderColor,
        classBorderColorHover,
        classStatusColor,
    };
}