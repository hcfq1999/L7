import { PointLayer, Scene } from '@antv/l7';
import * as allMap from '@antv/l7-maps';

export function MapRender(option: { map: string; renderer: string }) {
  const scene = new Scene({
    id: 'map',
    renderer: option.renderer === 'device' ? 'device' : 'regl',
    map: new allMap[option.map || 'Map']({
      style: 'light',
      center: [121.434765, 31.256735],
      zoom: 14.83,
    }),
  });
  scene.addImage(
    '00',
    'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
  );
  scene.addImage(
    '01',
    'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg',
  );
  scene.addImage(
    '02',
    'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
  );
  scene.on('loaded', () => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json',
    )
      .then((res) => res.json())
      .then((data) => {
        const imageLayer = new PointLayer()
          .source(data, {
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            },
          })
          .shape('name', ['00', '01', '02'])
          .size(10);
        const imageLayerText = new PointLayer()
          .source(data, {
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            },
          })
          .shape('name', 'text')
          .color('#f00')
          .size(25)
          .style({
            textOffset: [0, 20],
          });
        scene.addLayer(imageLayer);
        scene.addLayer(imageLayerText);

        if (window['screenshot']) {
          window['screenshot']();
        }
      });
  });
}
