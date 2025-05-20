import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    widgets: [
        { id: 'clock-1', type: 'clock', position: { x: 0, y: 0 }, size: { w: 1, h: 1 }, config: { timezone: 'Europe/Paris' } },
        { id: 'weather-1', type: 'weather', position: { x: 1, y: 0 }, size: { w: 1, h: 1 }, config: { city: 'Paris' } },
        { id: 'todo-1', type: 'todo', position: { x: 0, y: 1 }, size: { w: 1, h: 1 }, config: {} },
        { id: 'quote-1', type: 'quote', position: { x: 1, y: 1 }, size: { w: 1, h: 1 }, config: {} },
    ],
    nextId: 5,
    gridConfig: {
        cols: 4,
        rowHeight: 150,
    }
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { type, position, size = { w: 1, h: 1 }, config } = action.payload;
            state.widgets.push({
                id: `${type}-${state.nextId}`,
                type,
                position,
                size,
                config,
            });
            state.nextId += 1;
        },
        removeWidget: (state, action) => {
            const widgetId = action.payload;
            state.widgets = state.widgets.filter(widget => widget.id !== widgetId);
        },
        updateWidgetPosition: (state, action) => {
            const { id, position } = action.payload;
            const widget = state.widgets.find(w => w.id === id);
            if (widget) {
                widget.position = position;
            }
        },
        updateWidgetSize: (state, action) => {
            const { id, size } = action.payload;
            const widget = state.widgets.find(w => w.id === id);
            if (widget) {
                widget.size = size;
            }
        },
        updateWidgetConfig: (state, action) => {
            const { id, config } = action.payload;
            const widget = state.widgets.find(w => w.id === id);
            if (widget) {
                widget.config = { ...widget.config, ...config };
            }
        },
        updateGridConfig: (state, action) => {
            state.gridConfig = { ...state.gridConfig, ...action.payload };
        },
        saveLayout: (state) => {
            // Cette action est utilisée pour déclencher la sauvegarde dans localStorage
            // via un middleware ou effect (utilisation de useEffect dans le Dashboard)
        },
        loadLayout: (state, action) => {
            // Restaure la disposition sauvegardée
            if (action.payload) {
                state.widgets = action.payload.widgets;
                state.nextId = action.payload.nextId;
                state.gridConfig = action.payload.gridConfig || state.gridConfig;
            }
        }
    },
});

export const {
    addWidget,
    removeWidget,
    updateWidgetPosition,
    updateWidgetSize,
    updateWidgetConfig,
    updateGridConfig,
    saveLayout,
    loadLayout
} = dashboardSlice.actions;

export default dashboardSlice.reducer;