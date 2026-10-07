/**
 * ============================================================================
 * 🥊 RETO 04 — Contenedor del Bar Salesiano (useState directo)
 * Módulo: Programación Móvil — 3° Bachillerato Técnico (UETS)
 * ============================================================================
 *
 * 📖 MISIÓN:
 * Conectar el dominio (Reto 01) con los componentes (Retos 02 y 03) usando
 * `useState` directamente en la pantalla. NADA de custom hooks todavía: eso
 * llega en la Semana 09.
 *
 * 🛠️ INSTRUCCIONES:
 *  1. Implementa `incrementar`, `decrementar` y `reiniciar` reutilizando
 *     `calcularValor` del dominio (no sumes a mano).
 *  2. Usa `estadoUI` para deshabilitar los botones en los límites.
 *  3. INTEGRADOR: agrega 2 contadores más (Empanadas y Jugos) repitiendo el
 *     estado.
 *  4. Ejecuta en tu terminal: `pnpm run start:04`
 */

import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonContador } from '@/components/BotonContador';
import { ContadorDisplay } from '@/components/ContadorDisplay';
import { calcularValor, estadoUI, type ContadorConfig } from '@/domain/counter';

export default function Home() {
  const [valor, setValor] = useState(0);
  const [valorEmpanadas, setValorEmpanadas] = useState(0);
  const [valorJugos, setValorJugos] = useState(0);

  const configSanduches: ContadorConfig = {
    valor,
    paso: 1,
    minimo: 0,
    maximo: 10,
  };
  const configEmpanadas: ContadorConfig = {
    valor: valorEmpanadas,
    paso: 1,
    minimo: 0,
    maximo: 10,
  };
  const configJugos: ContadorConfig = {
    valor: valorJugos,
    paso: 1,
    minimo: 0,
    maximo: 10,
  };

  const estadoSanduches = estadoUI(valor, configSanduches);
  const estadoEmpanadas = estadoUI(valorEmpanadas, configEmpanadas);
  const estadoJugos = estadoUI(valorJugos, configJugos);

  const incrementarSanduches = () => {
    setValor(calcularValor(configSanduches, 'incrementar'));
  };
  const decrementarSanduches = () => {
    setValor(calcularValor(configSanduches, 'decrementar'));
  };
  const incrementarEmpanadas = () => {
    setValorEmpanadas(calcularValor(configEmpanadas, 'incrementar'));
  };
  const decrementarEmpanadas = () => {
    setValorEmpanadas(calcularValor(configEmpanadas, 'decrementar'));
  };
  const incrementarJugos = () => {
    setValorJugos(calcularValor(configJugos, 'incrementar'));
  };
  const decrementarJugos = () => {
    setValorJugos(calcularValor(configJugos, 'decrementar'));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bar Salesiano · Contadores</Text>

        {/* 📖 ¿Qué props acepta? Revisa el TSDoc de <ContadorDisplay> */}
        <ContadorDisplay valor={valor} etiqueta="Sanduches" />

        <View style={styles.actions}>
          <BotonContador
            label="+1"
            onPress={incrementarSanduches}
            variante="primary"
            disabled={estadoSanduches === 'MAXIMO'}
          />
          <BotonContador
            label="-1"
            onPress={decrementarSanduches}
            variante="secondary"
            disabled={estadoSanduches === 'MINIMO'}
          />
          <BotonContador
            label="Reiniciar"
            onPress={() => setValor(0)}
            variante="danger"
          />
        </View>

        <ContadorDisplay valor={valorEmpanadas} etiqueta="Empanadas" />
        <View style={styles.actions}>
          <BotonContador
            label="+1"
            onPress={incrementarEmpanadas}
            variante="primary"
            disabled={estadoEmpanadas === 'MAXIMO'}
          />
          <BotonContador
            label="-1"
            onPress={decrementarEmpanadas}
            variante="secondary"
            disabled={estadoEmpanadas === 'MINIMO'}
          />
          <BotonContador
            label="Reiniciar"
            onPress={() => setValorEmpanadas(0)}
            variante="danger"
          />
        </View>

        <ContadorDisplay valor={valorJugos} etiqueta="Jugos" />
        <View style={styles.actions}>
          <BotonContador
            label="+1"
            onPress={incrementarJugos}
            variante="primary"
            disabled={estadoJugos === 'MAXIMO'}
          />
          <BotonContador
            label="-1"
            onPress={decrementarJugos}
            variante="secondary"
            disabled={estadoJugos === 'MINIMO'}
          />
          <BotonContador
            label="Reiniciar"
            onPress={() => setValorJugos(0)}
            variante="danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EFE6D6',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#0A0A0A',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
});
