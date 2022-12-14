/*
 *   Full Credits to acquitelol (https://github.com/acquitelol/)
 *   Code taken from https://github.com/acquitelol/dislate/blob/main/src/components/Settings.tsx
 *   and https://github.com/acquitelol/dislate/blob/main/src/components/Credits.tsx
 */

import { FormRow, FormSection, FormSwitch, ScrollView, Text, View } from "enmity/components";
import { Constants, Dialog, Navigation, React, StyleSheet } from "enmity/metro/common";
import { authors, changelog, name, sourceUrl, version } from "../../manifest.json";
import { SettingsStore } from "enmity/api/settings";
import { getByProps } from "enmity/metro";
import { hasUpdate, showChangelog, showUpdateDialog } from "../pluginUpdater";

interface SettingsProps {
    settings: SettingsStore;
}

const Router = getByProps("transitionToGuild");

export default ({ settings }: SettingsProps) => {
    const styles = StyleSheet.createThemedStyleSheet({
        item: { color: Constants.ThemeColorMap.TEXT_MUTED },
        text_container: {
            paddingLeft: 15,
            paddingTop: 5,
            flexDirection: "column",
            flexWrap: "wrap",
        },
        main_text: {
            opacity: 0.975,
            letterSpacing: 0.25,
        },
        header: {
            color: Constants.ThemeColorMap.HEADER_PRIMARY,
            fontFamily: Constants.Fonts.DISPLAY_BOLD,
            fontSize: 25,
            letterSpacing: 0.25,
        },
        sub_header: {
            color: Constants.ThemeColorMap.HEADER_SECONDARY,
            opacity: 0.975,
            fontSize: 12.75,
        },
    });

    const [touchX, setTouchX] = React.useState();
    const [touchY, setTouchY] = React.useState();

    return (
        <>
            <ScrollView
                onTouchStart={(e) => {
                    setTouchX(e.nativeEvent.pageX);
                    setTouchY(e.nativeEvent.pageY);
                }}
                onTouchEnd={(e) => {
                    if (
                        touchX - e.nativeEvent.pageX < -100 &&
                        touchY - e.nativeEvent.pageY < 40 &&
                        touchY - e.nativeEvent.pageY > -40
                    )
                        Navigation.pop();
                }}
            >
                <View>
                    <View style={styles.text_container}>
                        <Text style={[styles.main_text, styles.header]}>{name}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.main_text, styles.sub_header]}>Author:</Text>
                            <Text
                                style={[
                                    styles.main_text,
                                    styles.sub_header,
                                    { paddingLeft: 4, fontFamily: Constants.Fonts.DISPLAY_BOLD },
                                ]}
                            >
                                {` ${authors.map((a) => a.name).join(", ")}`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.main_text, styles.sub_header]}>Version:</Text>
                            <Text
                                style={[
                                    styles.main_text,
                                    styles.sub_header,
                                    { paddingLeft: 4, fontFamily: Constants.Fonts.DISPLAY_BOLD },
                                ]}
                            >
                                {` ${version}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <FormSection title="Badges">
                    <FormRow
                        label="Aliucord"
                        subLabel="Show Aliucord Badges"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("showAliucord", true)}
                                onValueChange={() => settings.toggle("showAliucord", true)}
                            />
                        }
                    />
                    <FormRow
                        label="BetterDiscord"
                        subLabel="Show BetterDiscord Badges"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("showBetterDiscord", true)}
                                onValueChange={() => settings.toggle("showBetterDiscord", true)}
                            />
                        }
                    />
                    <FormRow
                        label="Replugged"
                        subLabel="Show Replugged Badges"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("showReplugged", true)}
                                onValueChange={() => settings.toggle("showReplugged", true)}
                            />
                        }
                    />
                    <FormRow
                        label="Velocity"
                        subLabel="Show Velocity Badges"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("showVelocity", true)}
                                onValueChange={() => settings.toggle("showVelocity", true)}
                            />
                        }
                    />
                    <FormRow
                        label="Vencord"
                        subLabel="Show Vencord Badges"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("showVencord", true)}
                                onValueChange={() => settings.toggle("showVencord", true)}
                            />
                        }
                    />
                </FormSection>
                <FormSection title="Updates">
                    <FormRow
                        label="Check for Updates on startup"
                        subLabel={"Checks automatically for updates when starting the Plugin"}
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("autoUpdateCheck", true)}
                                onValueChange={() => settings.toggle("autoUpdateCheck", true)}
                            />
                        }
                    />
                    <FormRow
                        label="Check for Updates"
                        trailing={FormRow.Arrow}
                        onPress={() => {
                            hasUpdate().then((b) => {
                                if (b) showUpdateDialog();
                                else
                                    Dialog.show({
                                        title: "Plugin Updater",
                                        body: `**${name}** is already on the latest version (**${version}**)`,
                                        confirmText: "OK",
                                    });
                            });
                        }}
                    />
                    <FormRow
                        label="Show Changelog"
                        subLabel={`Shows the changelog for v${version}`}
                        trailing={FormRow.Arrow}
                        onPress={() => showChangelog()}
                        disabled={!changelog.length}
                    />
                </FormSection>
                <FormSection title="Source">
                    <FormRow
                        label="Source"
                        subLabel={`See the Source Code for ${name}`}
                        trailing={FormRow.Arrow}
                        onPress={() => Router?.openURL(sourceUrl)}
                    />
                </FormSection>
            </ScrollView>
        </>
    );
};
