import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
    addWidget,
    removeWidget,
    updateWidgetPosition,
    updateWidgetSize,
    saveLayout,
    loadLayout
} from '../redux/dashboardSlice';
import Clock from './widgets/Clock';
import Weather from './widgets/Weather';
import TodoList from './widgets/TodoList';
import QuoteGenerator from './widgets/QuoteGenerator';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    const { widgets, gridConfig } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    // Chargement de la disposition sauvegardée
    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboard-layout');
        if (savedLayout) {
            try {
                const parsedLayout = JSON.parse(savedLayout);
                dispatch(loadLayout(parsedLayout));
            } catch (e) {
                console.error('Erreur lors du chargement de la disposition:', e);
            }
        }
    }, [dispatch]);

    // Sauvegarde de la disposition
    useEffect(() => {
        if (widgets.length > 0) {
            localStorage.setItem('dashboard-layout', JSON.stringify({
                widgets,
                nextId: widgets.length + 1,
                gridConfig
            }));
        }
    }, [widgets, gridConfig]);

    const renderWidget = (widget) => {
        switch (widget.type) {
            case 'clock':
                return <Clock key={widget.id} id={widget.id} config={widget.config} />;
            case 'weather':
                return <Weather key={widget.id} id={widget.id} config={widget.config} />;
            case 'todo':
                return <TodoList key={widget.id} id={widget.id} config={widget.config} />;
            case 'quote':
                return <QuoteGenerator key={widget.id} id={widget.id} config={widget.config} />;
            default:
                return null;
        }
    };

    const handleAddWidget = (type) => {
        // Trouver une position libre sur la grille
        const positions = widgets.map(w => w.position);
        let newPos = { x: 0, y: 0 };

        // Trouver une position libre en augmentant y
        while (positions.some(p => p.x === newPos.x && p.y === newPos.y)) {
            newPos.y++;
        }

        dispatch(
            addWidget({
                id: `${Date.now()}-${Math.random()}`, // Ensure unique string id
                type,
                position: newPos,
                size: { w: 1, h: 1 },
                config: {},
            })
        );
    };

    const handleLayoutChange = (layout) => {
        // Mise à jour de la position et taille des widgets
        layout.forEach(item => {
            const widgetId = item.i;
            const widget = widgets.find(w => w.id === widgetId);

            if (widget) {
                // Si la position a changé
                if (widget.position.x !== item.x || widget.position.y !== item.y) {
                    dispatch(updateWidgetPosition({
                        id: widgetId,
                        position: { x: item.x, y: item.y }
                    }));
                }

                // Si la taille a changé
                if (widget.size.w !== item.w || widget.size.h !== item.h) {
                    dispatch(updateWidgetSize({
                        id: widgetId,
                        size: { w: item.w, h: item.h }
                    }));
                }
            }
        });

        // Sauvegarder le layout
        dispatch(saveLayout());
    };

    // Convertir les widgets pour react-grid-layout
    const layoutItems = widgets.map(widget => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        w: widget.size.w,
        h: widget.size.h,
        minW: 1,
        minH: 1,
        maxW: 4,
        maxH: 4
    }));

    return (
        <div className="dashboard">
            <div className="dashboard-controls">
                <h2>Ajouter un widget</h2>
                <div className="widget-buttons">
                    <button onClick={() => handleAddWidget('clock')}>+ Horloge</button>
                    <button onClick={() => handleAddWidget('weather')}>+ Météo</button>
                    <button onClick={() => handleAddWidget('todo')}>+ Todo List</button>
                    <button onClick={() => handleAddWidget('quote')}>+ Citation</button>
                </div>
            </div>

            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: layoutItems }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: gridConfig.cols, md: gridConfig.cols, sm: 2, xs: 1, xxs: 1 }}
                rowHeight={gridConfig.rowHeight}
                onLayoutChange={handleLayoutChange}
                isDraggable={true}
                isResizable={true}
                compactType="vertical"
                margin={[20, 20]}
            >
                {widgets.map(widget => (
                    <div key={widget.id} className="widget-container">
                        <div className="widget-header">
                            {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}
                            <button
                                className="remove-widget"
                                onClick={() => dispatch(removeWidget(widget.id))}
                            >
                                x
                            </button>
                        </div>
                        <div className="widget-content">
                            {renderWidget(widget)}
                        </div>
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
};

export default Dashboard;