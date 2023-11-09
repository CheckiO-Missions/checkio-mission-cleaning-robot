requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function cleaning_robot_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * 
             * attr
             * 
             */
            const attr = {
                capacity: {
                    'font-family': 'Times',
                    'font-weight': 'bold',
                    'fill': '#FFFFFF',
                },
                battery: {
                    'stroke-width': '0',
                    'fill': '#FABA00',
                },
                robot: {
                    body: {
                        'stroke-width': '3px',
                        'stroke': '#294270',
                        'fill': '#96C5E4',
                    },
                    center_bar: {
                        'stroke-width': '0px',
                        'fill': '#96C5E4',
                    },
                },
                room_text: {
                    'font-family': 'Times',
                    'font-weight': 'bold',
                    'fill': '#294270',
                },
                room: {
                    'stroke': '#15191A',
                    'fill': '#C9EBFB',
                },
                room_junk: {
                    'stroke': '#15191A',
                    'fill': '#96C5E4',
                },
            }

            /**
             * 
             * values
             * 
             */
            const [capacity, start, battery, junk_room] = data.in
            const answer = data.ext.answer
            const [w, h] = [3, 3]
            const unit = 200 / Math.max(w, h)

            /**
             * 
             * paper
             * 
             */
            const grid_size_px_w = unit * w
            const grid_size_px_h = unit * h
            const os = 20
            const paper = Raphael(tgt_node, grid_size_px_w + os * 2, grid_size_px_h + os * 2)

            /**
             * 
             * draw
             * 
             */
            const au = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            for (let i = 0; i < h; i += 1) {
                for (let j = 0; j < w; j += 1) {
                    // grid of room(or junk room)
                    paper.rect(j*unit+os, i*unit+os, unit, unit).attr(
                        au[i*3+j] == junk_room ? attr.room_junk: attr.room
                    )
                    // cleaning robot & number of capacity
                    if (au[i*3+j] == start) {
                        paper.circle((j*unit+os) + unit/2, (i*unit+os) + unit/2, (unit/2)*.7).attr(
                            attr.robot.body)
                        paper.rect(j*unit+os+(unit/2*.25), i*unit+os+(unit/2*.85), unit*.75, unit*.15).attr(
                            attr.robot.center_bar)
                        paper.text((j*unit+os) + unit * .75, (i*unit+os) + unit/2, capacity).attr(
                            attr.capacity).attr({'font-size': (unit*.3)+'px'})
                    }
                    // battery
                    if (au[i*3+j] == battery) {
                        paper.path(['M', (j*unit+os) + unit/2*1.2, (i*unit+os) + unit*.05, 
                                    'l', -(unit/2*.6), unit/2,
                                    'h', unit/2*.4,
                                    'z']).attr(attr.battery)
                        paper.path(['M', (j*unit+os) + unit/2*0.8, (i*unit+os) + unit*.95, 
                                    'l', unit/2*.6, -unit/2,
                                    'h', -unit/2*.5,
                                    'z']).attr(attr.battery)
                    }
                    // letter of room
                    paper.text((j*unit+os) + unit/2, (i*unit+os) + unit/2, au[i*3+j]).attr(
                        attr.room_text).attr({'font-size': (unit*.6)+'px'})
                }
            }

            /**
             * 
             * formula
             * 
             */
            const formula = `${answer * 4**capacity} / ${4**capacity} = ${answer}`
            paper.text(100+os, 200+os+os/2, formula)
        }
        var io = new extIO({
            animation: function ($expl, data) {
                cleaning_robot_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
